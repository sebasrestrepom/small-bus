import { MigrationInterface, QueryRunner } from "typeorm";

export class changeTypeValue1679117237636 implements MigrationInterface {
    name = 'changeTypeValue1679117237636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "payment_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "payment_id" integer NOT NULL`);
    }

}
