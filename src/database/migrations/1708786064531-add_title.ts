import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitle1708786064531 implements MigrationInterface {
    name = 'AddTitle1708786064531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "title" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "title"`);
    }

}
