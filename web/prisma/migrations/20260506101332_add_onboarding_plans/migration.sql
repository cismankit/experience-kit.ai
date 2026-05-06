-- CreateTable
CREATE TABLE "OnboardingPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT,
    "version" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "inputState" JSONB NOT NULL,
    "resultState" JSONB,
    "maturityScore" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OnboardingPlan_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OnboardingPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "OnboardingPlan_workspaceId_createdAt_idx" ON "OnboardingPlan"("workspaceId", "createdAt");

-- CreateIndex
CREATE INDEX "OnboardingPlan_workspaceId_userId_status_idx" ON "OnboardingPlan"("workspaceId", "userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingPlan_workspaceId_version_key" ON "OnboardingPlan"("workspaceId", "version");
