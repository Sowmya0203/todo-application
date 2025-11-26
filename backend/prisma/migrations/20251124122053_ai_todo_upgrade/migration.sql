-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'NONE');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "priority" "Priority" DEFAULT 'NONE',
ADD COLUMN     "recurrence" TEXT,
ADD COLUMN     "tags" TEXT[];
