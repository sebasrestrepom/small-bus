import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1679018605960 implements MigrationInterface {
    name = 'initial1679018605960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rider" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_1ed6540e613592e2a470a162ef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "position_latitude" numeric(10,4) NOT NULL, "position_longitude" numeric(10,4) NOT NULL, CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "value" integer NOT NULL, "driver_id" integer, "rider_id" integer, "start_position_latitude" numeric(10,4) NOT NULL, "start_position_longitude" numeric(10,4) NOT NULL, "end_position_latitude" numeric(10,4) NOT NULL, "end_position_longitude" numeric(10,4) NOT NULL, CONSTRAINT "REL_90a1ac5467b49859d4ed9637f2" UNIQUE ("driver_id"), CONSTRAINT "REL_020408bf623e0ad3dc1bb4ef25" UNIQUE ("rider_id"), CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_020408bf623e0ad3dc1bb4ef255" FOREIGN KEY ("rider_id") REFERENCES "rider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_020408bf623e0ad3dc1bb4ef255"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TABLE "rider"`);
    }

}
