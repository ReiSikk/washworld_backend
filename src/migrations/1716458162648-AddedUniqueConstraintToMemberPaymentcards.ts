import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUniqueConstraintToMemberPaymentcards1716458162648 implements MigrationInterface {
    name = 'AddedUniqueConstraintToMemberPaymentcards1716458162648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_payment_card" ADD CONSTRAINT "UQ_cab78b3e4bf221b8dcff9fa9e8e" UNIQUE ("memberId", "paymentCardId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_payment_card" DROP CONSTRAINT "UQ_cab78b3e4bf221b8dcff9fa9e8e"`);
    }

}
