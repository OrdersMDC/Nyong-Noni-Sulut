import { test, expect } from '@playwright/test'

test.describe('Admin', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/admin/login')
    await expect(page.getByRole('heading', { name: /admin login/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
  })

  test('should not appear in homepage navigation', async ({ page }) => {
    await page.goto('/')
    const adminLinks = page.getByRole('link', { name: /admin/i })
    await expect(adminLinks).toHaveCount(0)
  })

  test('should not redirect to login in local dev mode', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
  })

  test('should show local mode notice on login page', async ({ page }) => {
    await page.goto('/admin/login')
    await expect(page.getByText(/mode pengembangan lokal/i)).toBeVisible()
  })
})
