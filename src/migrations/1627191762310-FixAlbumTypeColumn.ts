import {MigrationInterface, QueryRunner} from "typeorm";

export class FixAlbumTypeColumn1627191762310 implements MigrationInterface {
    name = 'FixAlbumTypeColumn1627191762310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "album_albumtype_enum" RENAME TO "album_albumtype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "album_albumtype_enum" AS ENUM('single', 'ep', 'miniAlbum', 'fullAlbum', 'ost', 'unknown')`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" TYPE "album_albumtype_enum" USING "albumType"::"text"::"album_albumtype_enum"`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" SET DEFAULT 'unknown'`);
        await queryRunner.query(`DROP TYPE "album_albumtype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" SET DEFAULT 'unknown'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "album_albumtype_enum_old" AS ENUM('single', 'ep', 'miniAlbum', 'fullAlbum', 'ost')`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" TYPE "album_albumtype_enum_old" USING "albumType"::"text"::"album_albumtype_enum_old"`);
        await queryRunner.query(`DROP TYPE "album_albumtype_enum"`);
        await queryRunner.query(`ALTER TYPE "album_albumtype_enum_old" RENAME TO "album_albumtype_enum"`);
    }

}
