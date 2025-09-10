from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    try:
        # Navigate to the app
        page.goto("http://localhost:5173", timeout=60000)

        # Use ID selectors
        wilaya_select = page.locator('#wilaya-select')
        category_select = page.locator('#category-select')

        # Wait for the selects to be visible
        expect(wilaya_select).to_be_visible()
        expect(category_select).to_be_visible()

        # Select a Wilaya and a Category
        wilaya_select.select_option(label='16 - Algiers')
        category_select.select_option(label='Restaurant')

        # Click the search button
        search_button = page.get_by_role("button", name="Search Entities")
        expect(search_button).to_be_enabled()
        search_button.click()

        # Wait for the results to appear, with a longer timeout
        expect(page.get_by_text("Intelligence Report")).to_be_visible(timeout=60000)

        # Take a screenshot of the entire page
        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
