import { MigrationInterface, QueryRunner } from "typeorm";

export class changeValueType1679023812388 implements MigrationInterface {
    name = 'changeValueType1679023812388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "value" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "value" integer`);
    }

}
