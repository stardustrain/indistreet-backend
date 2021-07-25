import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPersonEntity1627194654190 implements MigrationInterface {
    name = 'AddPersonEntity1627194654190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "twitterLink" character varying NOT NULL, "instagramLink" character varying NOT NULL, "musicianId" integer, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "musician" ADD "bio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TYPE "album_albumtype_enum" RENAME TO "album_albumtype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "album_albumtype_enum" AS ENUM('single', 'ep', 'miniAlbum', 'fullAlbum', 'ost', 'unknown')`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" TYPE "album_albumtype_enum" USING "albumType"::"text"::"album_albumtype_enum"`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" SET DEFAULT 'unknown'`);
        await queryRunner.query(`DROP TYPE "album_albumtype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" SET DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_df6e6c8e30a5e00a3bccedfb4d7" FOREIGN KEY ("musicianId") REFERENCES "musician"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_df6e6c8e30a5e00a3bccedfb4d7"`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "album_albumtype_enum_old" AS ENUM('single', 'ep', 'miniAlbum', 'fullAlbum', 'ost')`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" TYPE "album_albumtype_enum_old" USING "albumType"::"text"::"album_albumtype_enum_old"`);
        await queryRunner.query(`DROP TYPE "album_albumtype_enum"`);
        await queryRunner.query(`ALTER TYPE "album_albumtype_enum_old" RENAME TO "album_albumtype_enum"`);
        await queryRunner.query(`ALTER TABLE "musician" DROP COLUMN "bio"`);
        await queryRunner.query(`DROP TABLE "person"`);
    }

}
