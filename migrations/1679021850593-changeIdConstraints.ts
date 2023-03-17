import { MigrationInterface, QueryRunner } from "typeorm";

export class changeIdConstraints1679021850593 implements MigrationInterface {
    name = 'changeIdConstraints1679021850593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_020408bf623e0ad3dc1bb4ef255"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "REL_90a1ac5467b49859d4ed9637f2"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "REL_020408bf623e0ad3dc1bb4ef25"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_020408bf623e0ad3dc1bb4ef255" FOREIGN KEY ("rider_id") REFERENCES "rider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_020408bf623e0ad3dc1bb4ef255"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "REL_020408bf623e0ad3dc1bb4ef25" UNIQUE ("rider_id")`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "REL_90a1ac5467b49859d4ed9637f2" UNIQUE ("driver_id")`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_020408bf623e0ad3dc1bb4ef255" FOREIGN KEY ("rider_id") REFERENCES "rider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
