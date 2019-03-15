

# Dump of table cate
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cate`;

CREATE TABLE `cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pid` int(11) NOT NULL DEFAULT '0',
  `pathname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table site_config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `site_config`;

CREATE TABLE `site_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL DEFAULT '',
  `value` text,
  `desc` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `fk_options` DISABLE KEYS */;

INSERT INTO `options` (`key`, `value`, `desc`)
VALUES
  ('analyze_code','','统计代码，可以添加百度统计、Google 统计等'),
  ('auto_summary', '0', '自动摘要。0 为禁用，具体的数字为摘要截取的字符数'),
  ('comment','{\"type\":\"duoshuo\",\"name\":\"welefen2013\"}','评论类型'),
  ('description','A Simple & Fast Node Bloging Platform Base On ThinkJS 2.0 & ReactJS & ES6/7','网站描述'),
  ('favicon_url','','favicon'),
  ('github_blog','welefen/blog','GitHub blog 地址，如果填了则同步到 GitHub 上'),
  ('github_url','https://github.com/75team/thinkjs','GitHub 地址'),
  ('image_upload',NULL,'图片存放的位置，默认存在放网站上。也可以选择放在七牛或者又拍云等地方'),
  ('keywords','www,fasdf,fasdfa','网站关键字'),
  ('logo_url','/static/img/firekylin.jpg','logo 地址'),
  ('miitbeian','wewww','网站备案号'),
  ('postsListSize','10','文章一页显示的条数'),
  ('site_url','http://127.0.0.1:8360','网站地址'),
  ('theme','firekylin','主题名称'),
  ('title','Firekylin 系统','网站标题'),
  ('twitter_url','','微博地址'),
  ('navigation', '[{"label":"首页","url":"/","option":"home"},{"label":"归档","url":"/archives/","option":"archive"},{"label":"标签","url":"/tags","option":"tags"},{"label":"关于","url":"/about","option":"user"},{"label":"友链","url":"/links","option":"link"}]', '导航菜单'),
  ('upload',NULL,'上传配置，默认为本地，也可以选择七牛或者又拍云');

/*!40000 ALTER TABLE `fk_options` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table post
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `type` tinyint(11) NOT NULL DEFAULT '0' COMMENT '0 为文章，1 为页面',
  `status` tinyint(11) NOT NULL DEFAULT '0' COMMENT '0 为草稿，1 为待审核，2 为已拒绝，3 为已经发布',
  `title` varchar(255) NOT NULL,
  `created_year` year(4) NOT NULL DEFAULT '1970',
  `created_month` tinyint(2) NOT NULL DEFAULT '0',
  `pathname` varchar(255) NOT NULL DEFAULT '' COMMENT 'URL 的 pathname',
  `summary` longtext NOT NULL COMMENT '摘要',
  `markdown_content` longtext NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `allow_comment` tinyint(11) NOT NULL DEFAULT '1' COMMENT '1 为允许， 0 为不允许',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `is_public` tinyint(11) NOT NULL DEFAULT '1' COMMENT '1 为公开，0 为不公开',
  `comment_num` int(11) NOT NULL DEFAULT '0',
  `options` text COMMENT '一些选项，JSON 结构',
  PRIMARY KEY (`id`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table fk_post_cate
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post_cate`;

CREATE TABLE `post_cate` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `cate_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_cate` (`post_id`,`cate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




# Dump of table post_tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post_tag`;

CREATE TABLE `post_tag` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_tag` (`post_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table fk_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fk_user`;

CREATE TABLE `fk_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `display_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL DEFAULT '',
  `type` tinyint(11) NOT NULL DEFAULT '1' COMMENT '1 为管理员  2 为编辑',
  `email` varchar(255) NOT NULL DEFAULT '',
  `status` tinyint(11) NOT NULL DEFAULT '1' COMMENT '1 为有效 2 为禁用',
  `create_time` datetime NOT NULL,
  `create_ip` varchar(20) NOT NULL DEFAULT '',
  `last_login_time` datetime NOT NULL,
  `last_login_ip` varchar(20) NOT NULL DEFAULT '',
  `app_key` varchar(255) DEFAULT NULL,
  `app_secret` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;