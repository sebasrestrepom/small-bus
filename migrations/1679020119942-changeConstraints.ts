import { MigrationInterface, QueryRunner } from "typeorm";

export class changeConstraints1679020119942 implements MigrationInterface {
    name = 'changeConstraints1679020119942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "end_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "value" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "value" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "end_date" SET NOT NULL`);
    }

}
