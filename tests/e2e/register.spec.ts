import { test, expect } from '@playwright/test'

test.describe('Registration Page', () => {
  test('should display multi-step form', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByRole('heading', { name: /pendaftaran/i })).toBeVisible()
  })

  test('should display step indicator', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByText(/data diri/i).first()).toBeVisible()
    await expect(page.getByText(/alamat/i).first()).toBeVisible()
  })

  test('should have next and previous buttons', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByRole('button', { name: /selanjutnya/i })).toBeVisible()
  })
})
