import React from "react";

function RatingItem({
  styles,
  ukey,
  silverCup,
  bronzeCup,
  goldCup,
  currentID,
  user,
  uniqID = 1,
}) {
  // console.log("user.uniq_id ", user.uniq_id);
  console.log("uniqID", uniqID);
  return (
    <li
      key={ukey + "d832"}
      className={uniqID == user.uniq_id ? styles.you : ""}
    >
      <span className={ukey >= 3 ? styles.num : styles.win}>
        {ukey == 0 ? (
          <img style={{ width: "24px" }} src={goldCup} />
        ) : ukey == 1 ? (
          <img style={{ width: "24px" }} src={silverCup} />
        ) : ukey == 2 ? (
          <img style={{ width: "24px" }} src={bronzeCup} />
        ) : (
          ukey + 1
        )}
      </span>
      <div className={styles.avatarArea}>
        {user.tg_username !== "none" ? (
          <img
            alt={"o"}
            className={styles.avatar}
            src={`https://t.me/i/userpic/320/${user.tg_username}.jpg`}
            width="40px"
            height="40px"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "100px",
            }}
          />
        ) : (
          <img
            alt={"o"}
            className={styles.avatar}
            src={
              "https://bubbleit.vercel.app/static/media/icon-boost-1.4bcfcc1e3a733fb1b398.png"
            }
            width="40px"
            height="40px"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "100px",
            }}
          />
        )}
      </div>

      {/* <span>{user.tg_username.slice(0, 1).toUpperCase()}</span> */}
      <span className={styles.rate}>{user.clickAmount}</span>
      <span className={styles.userName}>{user.name}</span>
    </li>
  );
}

export default RatingItem;
