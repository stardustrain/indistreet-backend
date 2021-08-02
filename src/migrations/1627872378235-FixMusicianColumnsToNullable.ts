import {MigrationInterface, QueryRunner} from "typeorm";

export class FixMusicianColumnsToNullable1627872378235 implements MigrationInterface {
    name = 'FixMusicianColumnsToNullable1627872378235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musician" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "nameEn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "nameJp" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "instagramLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "twitterLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "spotifyLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "appleMusicLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "melonLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "soundcloudLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "facebookLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "bandcampLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "youtubeChannelLink" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "isRemoved" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "isRemoved" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "youtubeChannelLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "bandcampLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "facebookLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "soundcloudLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "melonLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "appleMusicLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "spotifyLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "twitterLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "instagramLink" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "nameJp" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "nameEn" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "musician" DROP COLUMN "name"`);
    }

}
