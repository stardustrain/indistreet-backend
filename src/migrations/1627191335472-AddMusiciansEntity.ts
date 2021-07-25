import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMusiciansEntity1627191335472 implements MigrationInterface {
    name = 'AddMusiciansEntity1627191335472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "musician" ("id" SERIAL NOT NULL, "isSolo" boolean NOT NULL, "instagramLink" character varying NOT NULL, "twitterLink" character varying NOT NULL, "spotifyLink" character varying NOT NULL, "appleMusicLink" character varying NOT NULL, "melonLink" character varying NOT NULL, "soundcloudLink" character varying NOT NULL, "facebookLink" character varying NOT NULL, "bandcampLink" character varying NOT NULL, "youtubeChannelLink" character varying NOT NULL, "nameEn" character varying NOT NULL, "nameJp" character varying NOT NULL, "isRemoved" boolean NOT NULL, CONSTRAINT "PK_4882f033208324a695dd353f2ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "album" ADD "musicianId" integer`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_f3f4b92fbae1f414faeed7f756b" FOREIGN KEY ("musicianId") REFERENCES "musician"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_f3f4b92fbae1f414faeed7f756b"`);
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "musicianId"`);
        await queryRunner.query(`DROP TABLE "musician"`);
    }

}
