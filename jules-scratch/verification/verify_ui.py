from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    def handle_console(msg):
        try:
            print(f"CONSOLE: {msg.text}")
        except Exception as e:
            print(f"Error printing console message: {e}")

    page.on("console", handle_console)

    page.goto("http://localhost:5173/")

    page.wait_for_timeout(5000)

    page.screenshot(path="jules-scratch/verification/debug.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
