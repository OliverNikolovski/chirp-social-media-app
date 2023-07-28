delete
from likes
where id in (select id
             from (select id,
                          row_number() over (partition by user_id, post_id order by id) as rnum
                   from likes) t
             where t.rnum > 1);

delete
from likes
where id in (select id
             from (select id,
                          row_number() over (partition by user_id, comment_id order by id) as rnum
                   from likes) t
             where t.rnum > 1);

delete
from follows
where followed_id = follower_id;

delete
from follows
where id in (select id
             from (select id,
                          row_number() over (partition by follower_id, followed_id order by id) as rnum
                   from follows) t
             where t.rnum > 1);

