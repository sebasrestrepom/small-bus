import { MigrationInterface, QueryRunner } from "typeorm";

export class changeConstraint21679020672024 implements MigrationInterface {
    name = 'changeConstraint21679020672024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "position_latitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "position_longitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "start_position_latitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "start_position_longitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "end_position_latitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "end_position_longitude" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "end_position_longitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "end_position_latitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "start_position_longitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "start_position_latitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "position_longitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "position_latitude" SET NOT NULL`);
    }

}
