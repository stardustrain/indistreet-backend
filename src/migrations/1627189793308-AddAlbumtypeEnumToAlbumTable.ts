import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAlbumtypeEnumToAlbumTable1627189793308 implements MigrationInterface {
    name = 'AddAlbumtypeEnumToAlbumTable1627189793308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "album_albumtype_enum" AS ENUM('single', 'ep', 'miniAlbum', 'fullAlbum', 'ost', 'unknown')`);
        await queryRunner.query(`ALTER TABLE "album" ADD "albumType" "album_albumtype_enum"`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" SET DEFAULT 'unknown'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "albumType"`);
        await queryRunner.query(`DROP TYPE "album_albumtype_enum"`);
    }

}
