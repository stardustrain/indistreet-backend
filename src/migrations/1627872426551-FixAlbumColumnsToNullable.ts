import {MigrationInterface, QueryRunner} from "typeorm";

export class FixAlbumColumnsToNullable1627872426551 implements MigrationInterface {
    name = 'FixAlbumColumnsToNullable1627872426551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "buyLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "melonLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "vibeLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "bugsLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "spotifyLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "youtubeMusicLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "appleMusicLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "isRemoved" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "releaseDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "releaseDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "isRemoved" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "appleMusicLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "youtubeMusicLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "spotifyLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "bugsLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "vibeLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "melonLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "buyLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "title" DROP NOT NULL`);
    }

}
