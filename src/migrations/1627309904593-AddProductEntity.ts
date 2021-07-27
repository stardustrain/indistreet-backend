import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProductEntity1627309904593 implements MigrationInterface {
    name = 'AddProductEntity1627309904593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "product_producttype_enum" AS ENUM('goods', 'album')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "productType" "product_producttype_enum" NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "purchaseLink" character varying NOT NULL, "price" integer NOT NULL, "isRemoved" boolean NOT NULL, "isSoldOut" boolean NOT NULL, "musicianId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_cc62722680a0faef5214c37b081" FOREIGN KEY ("musicianId") REFERENCES "musician"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_cc62722680a0faef5214c37b081"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "product_producttype_enum"`);
    }

}
