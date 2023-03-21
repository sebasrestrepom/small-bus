import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1679411740399 implements MigrationInterface {
    name = 'initial1679411740399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rider" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "payment_source_id" integer, CONSTRAINT "PK_1ed6540e613592e2a470a162ef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "position_latitude" numeric(10,4), "position_longitude" numeric(10,4), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "reference" character varying NOT NULL, "payment_id" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "value" numeric(10,2), "driver_id" integer, "rider_id" integer, "payment_id" integer, "start_position_latitude" numeric(10,4), "start_position_longitude" numeric(10,4), "end_position_latitude" numeric(10,4), "end_position_longitude" numeric(10,4), CONSTRAINT "REL_08309ef46b221807c505561951" UNIQUE ("payment_id"), CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_020408bf623e0ad3dc1bb4ef255" FOREIGN KEY ("rider_id") REFERENCES "rider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_08309ef46b221807c505561951c" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_08309ef46b221807c505561951c"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_020408bf623e0ad3dc1bb4ef255"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TABLE "rider"`);
    }

}
