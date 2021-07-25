import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGenreEntity1627200883996 implements MigrationInterface {
    name = 'AddGenreEntity1627200883996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "musician_genres_genre" ("musicianId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_6d285f418cf45f572db1a4912be" PRIMARY KEY ("musicianId", "genreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1449e6e4c5937bfd34ded4f223" ON "musician_genres_genre" ("musicianId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8de8286e435ecb00453dae3e8d" ON "musician_genres_genre" ("genreId") `);
        await queryRunner.query(`ALTER TABLE "musician_genres_genre" ADD CONSTRAINT "FK_1449e6e4c5937bfd34ded4f2232" FOREIGN KEY ("musicianId") REFERENCES "musician"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "musician_genres_genre" ADD CONSTRAINT "FK_8de8286e435ecb00453dae3e8d1" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musician_genres_genre" DROP CONSTRAINT "FK_8de8286e435ecb00453dae3e8d1"`);
        await queryRunner.query(`ALTER TABLE "musician_genres_genre" DROP CONSTRAINT "FK_1449e6e4c5937bfd34ded4f2232"`);
        await queryRunner.query(`DROP INDEX "IDX_8de8286e435ecb00453dae3e8d"`);
        await queryRunner.query(`DROP INDEX "IDX_1449e6e4c5937bfd34ded4f223"`);
        await queryRunner.query(`DROP TABLE "musician_genres_genre"`);
        await queryRunner.query(`DROP TABLE "genre"`);
    }

}
