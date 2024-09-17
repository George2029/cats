const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Init1726584913438 {
    name = 'Init1726584913438'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("cat_id" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "PK_142fa68e15b2755bca75ff703b1" PRIMARY KEY ("cat_id", "user_id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
