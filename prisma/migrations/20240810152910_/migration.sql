-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "pin" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);