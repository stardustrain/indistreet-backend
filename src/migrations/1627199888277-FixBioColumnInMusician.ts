import {MigrationInterface, QueryRunner} from "typeorm";

export class FixBioColumnInMusician1627199888277 implements MigrationInterface {
    name = 'FixBioColumnInMusician1627199888277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "bio" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musician" ALTER COLUMN "bio" SET NOT NULL`);
    }

}
