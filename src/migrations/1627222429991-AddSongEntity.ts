import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSongEntity1627222429991 implements MigrationInterface {
    name = 'AddSongEntity1627222429991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "song" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "melonLink" character varying NOT NULL, "bugsLink" character varying NOT NULL, "youtubeMusicLink" character varying NOT NULL, "spotifyLink" character varying NOT NULL, "vibeLink" character varying NOT NULL, "isRemoved" boolean NOT NULL, "albumId" integer, "musicianId" integer, CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_c529927ae410af49faaf2e239a5" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_1ba9406c9b6864fcb4d9bd1caad" FOREIGN KEY ("musicianId") REFERENCES "musician"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_1ba9406c9b6864fcb4d9bd1caad"`);
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_c529927ae410af49faaf2e239a5"`);
        await queryRunner.query(`DROP TABLE "song"`);
    }

}
