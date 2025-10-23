-- CreateTable
CREATE TABLE "public"."Corretor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "creci" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Corretor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Imovel" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "metros_quadrados" DOUBLE PRECISION NOT NULL,
    "quartos" INTEGER NOT NULL,
    "banheiros" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "corretorId" INTEGER NOT NULL,

    CONSTRAINT "Imovel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Corretor_email_key" ON "public"."Corretor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Corretor_creci_key" ON "public"."Corretor"("creci");

-- AddForeignKey
ALTER TABLE "public"."Imovel" ADD CONSTRAINT "Imovel_corretorId_fkey" FOREIGN KEY ("corretorId") REFERENCES "public"."Corretor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
