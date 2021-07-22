import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAlbumsEntity1626920655747 implements MigrationInterface {
    name = 'AddAlbumsEntity1626920655747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album" ("id" SERIAL NOT NULL, "buyLink" character varying NOT NULL, "melonLink" character varying NOT NULL, "vibeLink" character varying NOT NULL, "bugsLink" character varying NOT NULL, "spotifyLink" character varying NOT NULL, "youtubeMusicLink" character varying NOT NULL, "appleMusicLink" character varying NOT NULL, "description" character varying NOT NULL, "isRemoved" boolean NOT NULL, "releaseDate" date NOT NULL, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "album"`);
    }

}
