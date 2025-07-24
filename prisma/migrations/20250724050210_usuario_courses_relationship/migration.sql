/*
  Warnings:

  - Added the required column `usuarioId` to the `cursos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cursos" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
