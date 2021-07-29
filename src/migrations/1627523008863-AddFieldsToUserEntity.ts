import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFieldsToUserEntity1627523008863 implements MigrationInterface {
    name = 'AddFieldsToUserEntity1627523008863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "user_role_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`CREATE TYPE "user_language_enum" AS ENUM('en', 'ko')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "language" "user_language_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "birthday" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "language"`);
        await queryRunner.query(`DROP TYPE "user_language_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }

}
