import {MigrationInterface, QueryRunner} from "typeorm";

export class FixRelationMusicianAndUser1627975693156 implements MigrationInterface {
    name = 'FixRelationMusicianAndUser1627975693156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "musicianId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_b84b79de400a31efcf3e429e9f0" UNIQUE ("musicianId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_b84b79de400a31efcf3e429e9f0" FOREIGN KEY ("musicianId") REFERENCES "musician"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_b84b79de400a31efcf3e429e9f0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_b84b79de400a31efcf3e429e9f0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "musicianId"`);
    }

}
