import { MigrationInterface, QueryRunner } from "typeorm"

export class data1679018630281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO driver (first_name, last_name, position_latitude, position_longitude) VALUES
        ('camilo', 'ramos', 37.7749, -122.4194),
        ('juan', 'ayala', 40.7128, -74.0060),
        ('pedro', 'amador', 51.5074, -0.1278),
        ('sara', 'marquez', -33.8688, 151.2093),
        ('sebastian', 'lopez', 35.6895, 139.6917);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE driver`);
    }

}