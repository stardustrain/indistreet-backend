import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTitleColumnToAlbum1627261590750 implements MigrationInterface {
    name = 'AddTitleColumnToAlbum1627261590750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ADD "title" character varying`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "albumType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "title"`);
    }

}
