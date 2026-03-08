#!/usr/bin/env python3
"""
Alexa Developer Console – Skill-Setup Automation
Richtet den "Haus" Skill automatisch ein.

Verwendung:
  python3 setup_alexa_skill.py

Screenshots werden in alexa-setup/screenshots/ gespeichert.
"""

import json
import os
import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

ENDPOINT_URL = "https://agents.umzwei.de/webhook/alexa-haus"
SKILL_NAME   = "Haus"
LOCALE       = "de-DE"
SCREENSHOT_DIR = Path(__file__).parent / "screenshots"

INTERACTION_MODEL = json.dumps({
  "interactionModel": {
    "languageModel": {
      "invocationName": "haus",
      "intents": [
        {
          "name": "ChatIntent",
          "slots": [{"name": "query", "type": "AMAZON.SearchQuery"}],
          "samples": [
            "{query}", "frage {query}", "sage mir {query}",
            "ich m\u00f6chte wissen {query}", "erkl\u00e4re {query}",
            "wie ist {query}", "was ist {query}", "mach {query}",
            "schalte {query}", "stelle {query}", "kannst du {query}"
          ]
        },
        {"name": "AMAZON.CancelIntent",       "samples": []},
        {"name": "AMAZON.HelpIntent",         "samples": []},
        {"name": "AMAZON.StopIntent",         "samples": []},
        {"name": "AMAZON.NavigateHomeIntent", "samples": []},
        {"name": "AMAZON.FallbackIntent",     "samples": []}
      ],
      "types": []
    }
  }
}, ensure_ascii=False, indent=2)


def shot(page, name):
    SCREENSHOT_DIR.mkdir(exist_ok=True)
    path = SCREENSHOT_DIR / f"{name}.png"
    page.screenshot(path=str(path))
    print(f"  \U0001f4f8 Screenshot: {path}")


def wait_and_click(page, selector, description, timeout=30000):
    print(f"  \u23f3 Warte auf: {description}")
    el = page.wait_for_selector(selector, timeout=timeout)
    el.click()
    print(f"  \u2713 Geklickt: {description}")
    time.sleep(1)


def main():
    SCREENSHOT_DIR.mkdir(exist_ok=True)

    print("\n" + "="*60)
    print("  Alexa Developer Console \u2013 Automatisches Skill-Setup")
    print("="*60)
    print(f"\n  Skill-Name:  {SKILL_NAME}")
    print(f"  Endpoint:    {ENDPOINT_URL}")
    print(f"  Locale:      {LOCALE}")
    print()

    email    = input("  Amazon E-Mail: ").strip()
    password = input("  Amazon Passwort: ").strip()
    print()

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-dev-shm-usage"]
        )
        ctx  = browser.new_context(viewport={"width": 1280, "height": 900})
        page = ctx.new_page()

        print("[ 1/6 ] Login...")
        page.goto("https://developer.amazon.com/alexa/console/ask")
        shot(page, "01_start")

        try:
            page.wait_for_selector('input[type="email"], #ap_email', timeout=15000)
            page.fill('input[type="email"], #ap_email', email)
            shot(page, "02_email")
            try:
                page.click('#continue, [type="submit"]')
            except Exception:
                page.keyboard.press("Enter")
            time.sleep(2)
        except PWTimeout:
            pass

        try:
            page.wait_for_selector('#ap_password, input[type="password"]', timeout=10000)
            page.fill('#ap_password, input[type="password"]', password)
            shot(page, "03_password")
            try:
                page.click('#signInSubmit, [type="submit"]')
            except Exception:
                page.keyboard.press("Enter")
            time.sleep(3)
        except PWTimeout:
            pass

        shot(page, "04_after_login")

        for _ in range(3):
            url_now = page.url
            if "ap/mfa" in url_now or "auth-challenge" in url_now or "ap/cvf" in url_now:
                shot(page, "05_mfa")
                print("\n  \u26a0\ufe0f  2-Faktor-Authentifizierung erkannt!")
                otp = input("  OTP-Code eingeben: ").strip()
                try:
                    otp_field = page.wait_for_selector(
                        'input[name="otpCode"], input[id*="otp" i], input[type="tel"], input[autocomplete="one-time-code"]',
                        timeout=5000
                    )
                    otp_field.fill(otp)
                    page.keyboard.press("Enter")
                    time.sleep(3)
                    shot(page, "06_after_mfa")
                except PWTimeout:
                    print("  \u26a0\ufe0f  OTP-Feld nicht gefunden")
            else:
                break

        print("  Warte auf Alexa Developer Console...")
        try:
            page.wait_for_url("**/console/ask**", timeout=20000)
        except PWTimeout:
            shot(page, "05_stuck")
            if "signin" in page.url or "ap/" in page.url:
                print("  Login fehlgeschlagen.")
                browser.close()
                sys.exit(1)

        print("  \u2713 Eingeloggt\n")

        print("[ 2/6 ] Neuen Skill erstellen...")
        page.goto("https://developer.amazon.com/alexa/console/ask")
        time.sleep(3)
        shot(page, "06_ask_console")

        skill_url = None
        for el in page.query_selector_all('a[href*="/build/"]'):
            if SKILL_NAME.lower() in el.inner_text().strip().lower():
                skill_url = el.get_attribute("href")
                print(f"  \u2139\ufe0f  Vorhandener Skill: {el.inner_text().strip()}")
                break

        if skill_url:
            url = f"https://developer.amazon.com{skill_url}" if skill_url.startswith("/") else skill_url
            page.goto(url)
            time.sleep(3)
        else:
            try:
                wait_and_click(page, 'a[href*="create"], button:has-text("Create Skill")', "Create Skill Button")
            except Exception:
                page.goto("https://developer.amazon.com/alexa/console/ask/create")
                time.sleep(2)

            shot(page, "07_step1_name")
            page.wait_for_selector('text=Name your Skill', timeout=10000)
            time.sleep(1)
            page.keyboard.press("Escape")
            time.sleep(0.3)

            filled = page.evaluate("""(skillName) => {
                const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([type="search"])'));
                for (const el of inputs) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top > 150 && rect.width > 80 && el.offsetParent !== null) {
                        el.focus();
                        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                        setter.call(el, skillName);
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                        return true;
                    }
                }
                return false;
            }""", SKILL_NAME)
            print(f"  {'\u2713' if filled else '\u26a0\ufe0f '} Skill-Name: {SKILL_NAME}")

            time.sleep(1)
            locale_set = page.evaluate("""() => {
                const sel = document.querySelector('select');
                if (sel) {
                    for (const opt of sel.options) {
                        if (opt.value === 'de-DE' || opt.text.includes('German')) {
                            sel.value = opt.value;
                            sel.dispatchEvent(new Event('change', { bubbles: true }));
                            return 'select:' + opt.text;
                        }
                    }
                }
                for (const t of document.querySelectorAll('button, [role="combobox"]')) {
                    if (t.textContent.includes('English')) { t.click(); return 'clicked'; }
                }
                return null;
            }""")

            if locale_set and 'select:' in str(locale_set):
                print(f"  \u2713 Locale: {locale_set}")
            elif locale_set == 'clicked':
                time.sleep(0.5)
                try:
                    page.locator('[role="option"]:has-text("German"), li:has-text("German (DE)")').first.click()
                    print("  \u2713 Locale: German (DE)")
                except Exception:
                    print("  \u26a0\ufe0f  Locale nicht gesetzt")

            shot(page, "08_step1_done")
            page.click('button:has-text("Next")')
            time.sleep(2)
            shot(page, "09_step2_experience")

            for sel_txt in ['label:has-text("Other")', 'label:has-text("Custom")', 'label:has-text("Provision your own")']:
                try:
                    page.click(sel_txt, timeout=5000)
                    time.sleep(1)
                    print(f"  \u2713 {sel_txt}")
                except Exception:
                    pass

            shot(page, "10_step2_done")
            page.click('button:has-text("Next")')
            time.sleep(2)
            shot(page, "11_step3_templates")

            try:
                page.click('label:has-text("Start from scratch")', timeout=5000)
                time.sleep(1)
            except Exception:
                pass

            page.click('button:has-text("Next")')
            time.sleep(2)
            shot(page, "12_step4_review")

            page.click('button:has-text("Create Skill")')
            print("  \u23f3 Skill wird erstellt...")
            page.wait_for_url("**/build/**", timeout=30000)
            time.sleep(3)

        shot(page, "13_skill_editor")
        print("  \u2713 Skill Editor\n")

        print("[ 3/6 ] Interaction Model...")
        try:
            wait_and_click(page, 'a:has-text("JSON Editor"), [href*="jsonEditor"]', "JSON Editor", timeout=20000)
        except Exception:
            if "/build/" in page.url:
                page.goto(page.url.rstrip("/") + "/json")
        time.sleep(2)
        shot(page, "14_json_editor")

        success = page.evaluate("""(jsonStr) => {
            var editors = window.monaco && window.monaco.editor.getEditors();
            if (editors && editors.length > 0) { editors[0].setValue(jsonStr); return true; }
            return false;
        }""", INTERACTION_MODEL)

        if not success:
            try:
                editor = page.wait_for_selector('.monaco-editor .view-lines', timeout=8000)
                editor.click()
                page.keyboard.press("Control+a")
                time.sleep(0.3)
                page.evaluate(f"navigator.clipboard.writeText({json.dumps(INTERACTION_MODEL)})")
                page.keyboard.press("Control+v")
            except Exception as e:
                print(f"  \u26a0\ufe0f  JSON: {e}")
        print(f"  \u2713 JSON {'via Monaco' if success else 'via Clipboard'}")
        shot(page, "15_json_filled")

        try:
            wait_and_click(page, 'button:has-text("Save Model")', "Save Model", timeout=10000)
            time.sleep(2)
        except Exception:
            print("  \u26a0\ufe0f  Save Model nicht gefunden")
        shot(page, "16_saved")

        try:
            wait_and_click(page, 'button:has-text("Build Model")', "Build Model", timeout=10000)
            page.wait_for_selector('div:has-text("Build Successful"), [class*="success"]', timeout=120000)
            print("  \u2713 Build erfolgreich")
        except PWTimeout:
            print("  \u26a0\ufe0f  Build-Timeout")
        shot(page, "17_built")
        print()

        print("[ 4/6 ] Endpoint...")
        try:
            wait_and_click(page, 'a:has-text("Endpoint"), [href*="endpoint"]', "Endpoint", timeout=20000)
        except Exception:
            pass
        time.sleep(2)
        shot(page, "18_endpoint")

        try:
            page.click('input[value="HTTPS"], label:has-text("HTTPS")', timeout=5000)
        except Exception:
            pass

        inputs = page.query_selector_all('input[type="text"]')
        for inp in inputs:
            try:
                if inp.is_visible() and not inp.is_disabled():
                    inp.triple_click()
                    inp.fill(ENDPOINT_URL)
                    print(f"  \u2713 URL: {ENDPOINT_URL}")
                    break
            except Exception:
                pass

        try:
            sel = page.query_selector('select')
            if sel and sel.is_visible():
                for opt in sel.query_selector_all('option'):
                    if "trusted" in opt.inner_text().lower():
                        sel.select_option(value=opt.get_attribute("value"))
                        print("  \u2713 SSL: trusted CA")
                        break
        except Exception:
            pass

        shot(page, "19_endpoint_filled")
        try:
            wait_and_click(page, 'button:has-text("Save Endpoints"), button:has-text("Save")', "Save Endpoints", timeout=10000)
        except Exception:
            print("  \u26a0\ufe0f  Save Endpoints nicht gefunden")
        shot(page, "20_endpoint_saved")
        print()

        print("[ 5/6 ] Test...")
        try:
            wait_and_click(page, 'a:has-text("Test")', "Test Tab", timeout=10000)
            time.sleep(2)
        except Exception:
            pass
        shot(page, "21_test")

        print("[ 6/6 ] Fertig!")
        print("  \u2705 Alexa Skill 'Haus' eingerichtet.")
        print("  Test: 'Alexa, \u00f6ffne Haus' \u2192 Frage stellen")
        browser.close()


if __name__ == "__main__":
    main()
