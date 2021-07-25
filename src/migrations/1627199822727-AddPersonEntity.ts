import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPersonEntity1627199822727 implements MigrationInterface {
    name = 'AddPersonEntity1627199822727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "twitterLink" character varying NOT NULL, "instagramLink" character varying NOT NULL, "musicianId" integer, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "musician" ADD "bio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_df6e6c8e30a5e00a3bccedfb4d7" FOREIGN KEY ("musicianId") REFERENCES "musician"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_df6e6c8e30a5e00a3bccedfb4d7"`);
        await queryRunner.query(`ALTER TABLE "musician" DROP COLUMN "bio"`);
        await queryRunner.query(`DROP TABLE "person"`);
    }

}
