import { MigrationInterface, QueryRunner } from "typeorm";

export class changeTypeField1679111306307 implements MigrationInterface {
    name = 'changeTypeField1679111306307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rider" ALTER COLUMN "payment_source_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rider" ALTER COLUMN "payment_source_id" SET NOT NULL`);
    }

}
