import { test, expect } from '@playwright/test';

test.describe('Task Manager E2E (REAL backend)', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200');

        await expect(page.getByRole('heading', { name: 'Liste des tâches' })).toBeVisible();
    });

    test('should display the 6 mousse au chocolat steps', async ({ page }) => {
        const expectedSteps = [
            'Préparer les ingrédients',
            'Faire fondre le chocolat',
            'Séparer les blancs et les jaunes',
            'Monter les blancs en neige',
            'Incorporer délicatement',
            'Réfrigérer'
        ];

        for (const step of expectedSteps) {
            await expect(page.locator('.task-label', { hasText: step })).toBeVisible();
        }

        const count = await page.locator('.task-label').count();
        expect(count).toBeGreaterThanOrEqual(6);
    });


    test('should filter completed and incomplete tasks', async ({ page }) => {
        const total = await page.locator('.task-label').count();
        expect(total).toBeGreaterThanOrEqual(6);

        await page.locator('mat-button-toggle[value="completed"]').click();
        const completedCount = await page.locator('.task-label').count();
        expect(completedCount).toBeGreaterThanOrEqual(0); // peut être 0 si aucune n'est complétée

        await page.locator('mat-button-toggle[value="incomplete"]').click();
        const incompleteCount = await page.locator('.task-label').count();
        expect(incompleteCount).toBeGreaterThanOrEqual(1);

        await page.locator('mat-button-toggle[value="all"]').click();
        const allAgain = await page.locator('.task-label').count();
        expect(allAgain).toBe(total);
    });


    test('should open the add step dialog and add a new task', async ({ page }) => {
        await page.locator('.add-task-item .add-task-button button').click();

        await expect(page.getByRole('heading', { name: 'Nouvelle étape' })).toBeVisible();

        await page.getByLabel('Nom de l’étape').fill('Test E2E Étape');
        await page.getByLabel('Description').fill('Description E2E.');

        await page.getByRole('button', { name: 'Ajouter' }).click();

        await expect(page.getByText('Test E2E Étape')).toBeVisible();
    });

    test('should toggle status of a task', async ({ page }) => {
        const firstIcon = page.locator('.task-completion-status-icon').first();

        const before = (await firstIcon.textContent())?.trim();

        await firstIcon.click();
        await page.waitForTimeout(300);

        const after = (await firstIcon.textContent())?.trim();

        expect(after).not.toBe(before);
    });

});
