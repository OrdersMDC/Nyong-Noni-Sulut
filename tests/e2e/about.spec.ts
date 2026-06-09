import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('should display about content', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('heading', { name: /nyong noni sulawesi utara/i })).toBeVisible()
  })

  test('should display vision and mission', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByText(/visi/i)).toBeVisible()
    await expect(page.getByText(/misi/i)).toBeVisible()
  })
})
