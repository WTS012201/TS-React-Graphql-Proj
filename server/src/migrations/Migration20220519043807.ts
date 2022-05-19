import { Migration } from "@mikro-orm/migrations";

export class Migration20220519043807 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `username` text not null, `email` text not null, `password` text not null) default character set utf8mb4 engine = InnoDB;"
    );
    this.addSql(
      "alter table `user` add unique `user_username_unique`(`username`);"
    );
    this.addSql("alter table `user` add unique `user_email_unique`(`email`);");

    this.addSql(
      "create table `post` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null) default character set utf8mb4 engine = InnoDB;"
    );
  }

  async down(): Promise<void> {
    this.addSql("drop table if exists `user`;");

    this.addSql("drop table if exists `post`;");
  }
}
