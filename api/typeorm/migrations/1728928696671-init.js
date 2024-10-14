const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Init1728928696671 {
    name = 'Init1728928696671'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "likes" (
                "cat_id" character varying NOT NULL,
                "user_id" integer NOT NULL,
                "url" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                CONSTRAINT "PK_e460bbc47931f004c61f71eddca" PRIMARY KEY ("cat_id", "user_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "login" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "likes"
            ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "likes"
        `);
    }
}
