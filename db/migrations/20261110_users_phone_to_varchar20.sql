-- 电话号码改存字符串。
--
-- 说明：本脚本仅作为导入/迁移示例。当前库中没有存量数据，无需执行；
-- 新建库时 models/User.js 的 sync() 会直接按 VARCHAR(20) 建表。
--
-- 原因：11 位手机号（例如 13800138000）超出 MySQL INT 上限 2147483647，
-- 且电话号码需要保留前导 0，用整数列保存会丢信息。
--
-- 执行前先备份：
--   mysqldump --single-transaction landscape users > users_before_phone.sql
-- 确认没有正在进行的注册请求，再执行下面的 ALTER。
--
-- 回滚（超出 INT 范围的号码会失败或丢精度）：
--   ALTER TABLE users MODIFY COLUMN phone INT NOT NULL;

ALTER TABLE users
  MODIFY COLUMN phone VARCHAR(20) NOT NULL;
