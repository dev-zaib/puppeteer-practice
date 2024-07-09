const puppeteer = require("puppeteer");
const fs = require("fs").promises;

// List of URLs to process
const channelData = [
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC5dkX3nQTc-s3-ogpRPENXQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCJfQURxlI_pQdeJUGXtA_zw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC_gMaZjRhc5xrVrLv4_Ymfw/videos?view=0&sort=dd&shelf_id=0"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCQRqqY75jNRP_NUI2XNqlLQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCcsgaWyYzV0JVqaO5neFJxw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UClLNwS6A0VY_2PXwrCOW_vw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCs9Bi1j5s25Yinhmd-NJvJw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCxi18Qcb1B5fk2FdIE9AhbA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCrG82oiDaJa5-43cdfMYY5w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCa-uvd7p8TzrA6Hp9yjG2xw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCLiOkwnioXpLoI8KJ_5gsfw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCqA6zOSMpQ55vvguq4Y0jAg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCpMoNHMfgSzu8f4kj79URxg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC-tUtoApHArcrfhRH4ufsHA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/pagerduty"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCYLQVc6Uik6y361Z-VgR9kA"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCB9wCEaf_7iKRCXTDbxRxlA/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCD54KOJpqopWD8KX3dd3a9A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/degreed"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ZuoraInc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCiyS6coRsDQ17b3Kj9bl8jw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC02DL-XaONZdkyhU5-7N7TA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCdQxoXNGQeoxaqOD9JVIvUw/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCs8suW_zPhWNYLIHtKnH_6w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/workiva"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCsWq7LZaizhIi-c-Yo_bcpw"
    },
    {
        "YouTube Channel": "[Veeam - YouTube](https://www.youtube.com/channel/UC5YkxcYCG5b-fCcvHniW_ag)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC0A5W66_0K-_HnZEQecYGSw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCiwlFUEoboy_Q-n2aFZalvw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/walmart"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCLhtrgF6h4PP44nVRfSIovA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC2UlVBsngBJYo_bkjnwaM1g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/salsify"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCCsYok1mYyLWTnlwZDBx7uw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCn-HUpCznAzs9A_JoVbLTfA/shorts"
    },
    {
        "YouTube Channel": "https://www.youtube.com/entrata"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCJPwhlxwXk_dRGdbzKYK01w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/tradeshift"
    },
    {
        "YouTube Channel": "https://www.youtube.com/auth0"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC0ntvHJfviqvUHzdGBgrKlA"
    },
    {
        "YouTube Channel": "[OneStream Software YouTube Channel](https://www.youtube.com/channel/UCFsk2UjXWfk2fe6B0RNABwQ)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCMdR6t1oXaizteTaPl2SJFQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/sproutsocial"
    },
    {
        "YouTube Channel": "https://www.youtube.com/goguardian"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/saucelabs"
    },
    {
        "YouTube Channel": "https://www.youtube.com/BigcommerceDotCom"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCoTRFfSyUITwshN0P0FGYww"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCLyVctz20sO0ImUOWwUbFxw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCUGhY1mOxdEA4hyEnnB1NSw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/avidxchangeinc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC2nsbMQrh4sculGZkpHMxOw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCFTXNaDaL-I-ckUjFvr2A4Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/modernizingmedicine"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/schrodingerllc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/cisionna"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCeMr7Ji0skwzjp5D21BOO6Q/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCepu1fEfXlB39NF13-yiqew"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UClf_q5jvI3y8MwunNEFPCzw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/appfire"
    },
    {
        "YouTube Channel": "https://www.youtube.com/apple"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/sonatype"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/vtextv"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCYZ_AQmdBwaqUaDTW-OGUwg/videos?view=0&sort=dd&shelf_id=0"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCwr0eQsblxgpjkUXbiCjrRA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ModelNInc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCTL2V4fqMMERSWQa1kT4EMw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCmdbeavar82NEU2g8KrolDg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCjPZukasIgWoB4HBHga5CGA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/perforcesoftware"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCHApeeujNfxOGEz29mNBtoA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCL-8uAqpXwReDIbIRsxRlzg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCWG3kSC_Rj_rNiaYZrvNE4Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/forescout1"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCTuPaf8565CmMP12vfmjjFg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCllC7ASZ4GYGk0KSgXTaQ8A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC1-K1LXVr8zezGazWViTDfg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCMnlRiQLlrPn6-Jg7nvfD4w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/brivosystems/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCcvnDgwSH5Dl2b3Bxfz4OCQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/mrisoftware"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=QsGVrjp6_x8"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCPKJdU8WwCncqVzAiPnqkOA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCWaj4kNatW0x1MXghcF_JWw/videos"
    },
    {
        "YouTube Channel": "Adobe Workfront YouTube channel: [link](https://www.youtube.com/channel/UC0of2tWDIuvWyTVaRM83XQg)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/mediamath"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCPGzT4wecuWM0BH9mPiulXg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/interaction"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UClR5I9GI85WRnvUgm_AAH5w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/arasplm"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/amontravel"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCNvxnwi4n98uXxq9K8ObeNA"
    },
    {
        "YouTube Channel": "[Agilysys YouTube Channel](https://www.youtube.com/user/AgilysysInc)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCVpD7NrBhP9QtnWq_ic36ig"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/EngageSmart"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UChrU4z5nDNIR6XWefaLUksg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCkmAjbIecTIjTQctolYeuDw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/oculusvr/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/veracodeinc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/riministreet"
    },
    {
        "YouTube Channel": "https://www.youtube.com/zerto"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/momentivechannel"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC8CSnfJ4jeUHevwo9Mp_kzA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCNIn1Wy_K09MSRgTyinn0oA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCIhYoC2VIAJqCkoIWNHBQ3Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/SMSAssist"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UClqEmfUMxKbqCliKyOwJhGw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCxuidZCX0o4EgZlSaxSipEQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCE9xUuH4lhIUDOFR1OHlNNg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCepBK-_Km3y54dErkkwLwwQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/connectwise"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCyj0QFHbuw4kViZWe309pYg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ShiftGig"
    },
    {
        "YouTube Channel": "https://www.youtube.com/barracuda"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCXoGzLqW5xPRNdDaZ0iAo6Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCoSvlWS5XcwaSzIcbuJ-Ysg"
    },
    {
        "YouTube Channel": "[TiVo - YouTube](https://www.youtube.com/user/tivo)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/SailPointTechnologies"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC2dNR-0D7qmOShbT-98gFvw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCQsVmhSa4X-G3lHlUtejzLA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/playlist?list=PLzrRSHviWPiN2bHovjjSMsgP0hIPlQCVR"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCO-2QD8kP4YgNxUtNuJX8Ww"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCA21CuDK8hS-1JTLiCzqoWw/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCD8s14fu1pvknSoJORkZ0Ag"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCYU6nvKyRYnE5kiG9JXkXpA"
    },
    {
        "YouTube Channel": "[ServiceTitan YouTube channel](https://www.youtube.com/user/servicetitan)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/madwiremedia"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC7RmET0HM7SP2jspyxfA3Mw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCCZdBlrqsmZLXAKF9nTtAbA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCd71yC_q6dljF7xAB9j0-hg"
    },
    {
        "YouTube Channel": "[Edifecs YouTube Channel](https://www.youtube.com/user/edifecs)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/appirio"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCJC7egHqghye211WgTuXMAw"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/technisys"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCeuRotKRHVlN43qbE7DCxKQ/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC_slQLKTjIcPPbYwx85XsYA/about"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCDoKLwlfdfH61rkzD3pu_ZQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCLLurTBYufj95_5zTnJISnA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC2BoogM0AqwOJyoSp1S4ClQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCZXtdZWUeV-ZkrZBKYd5rvg"
    },
    {
        "YouTube Channel": "[Hortonworks YouTube Channel](https://www.youtube.com/Hortonworks)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/RadiSys"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "[StorageCraft YouTube Channel](https://www.youtube.com/channel/UC883A5fk56CuYyfiNI9wQcQ)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCz2CFklW0JLtr5pvMtKC2Yg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/truecommercevideo"
    },
    {
        "YouTube Channel": "https://www.youtube.com/automationanywhere"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCF79eya4ZfgWwk4GTf4G2jg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCvj0UKvDXckYAVsekh59F1w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCS7_5QG2WrugqAHxUEvUjfg"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC5YVjuMsaFjx73MakeXBw5Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC0FMj7YNdMYDnBtj_n9GWLw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCD-sH2wmZDhkpepIqYaMziw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/boingowireless"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCO5esazgfs0yJc9YNXPGBzA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCh2hNg76zo3d1qQqTWIQxDg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/Zenefits"
    },
    {
        "YouTube Channel": "https://www.youtube.com/ReflexisSystems"
    },
    {
        "YouTube Channel": "https://www.youtube.com/GitHub"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC1mn6J4_BQavcV6i3d9lPIw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCu51XPII7JI7ANH_1xklViA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCN-KeDq2_ilWqZtE_38RCJQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCcmBiPkUWWCrwwuq_CPbW2Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/knowbe4"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC7tOqqSbVzQ8Iyt2zIHNVJA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/coupasoftware"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCFlGEB0bPUC1vWoN57OzEag"
    },
    {
        "YouTube Channel": "https://www.youtube.com/Picsart"
    },
    {
        "YouTube Channel": "[Cvent YouTube Channel](https://www.youtube.com/user/cventvideo)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCfXJeN5_aMqOYnRq8uxmx8w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCajYOzooQmAwIX3kPL-4hHA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnicm8OUOyY3BLa5A_ybOaw/videos"
    },
    {
        "YouTube Channel": "[Filevine YouTube Channel](https://www.youtube.com/user/FilevineInc)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC8zrZ0kfXR96Zp2NmQssxPg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC4JxUrQkwiD1jY0SObjvq7Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/solarwindsinc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/gainsight"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/MasterControlVideo"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCjacbyjxoFYUiKK1URKcGQw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCUDcbirj-uouCkbX-cWqwjg/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/smartsheet"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/webPT"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCOYFJRciFqb-XqBSGSaj3CQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCo2IXZej8qNyIbbWWCG9z3Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/Fiscalnote"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC3l1TFjHhCljs3FusoIgrYA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/malwarebytes"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCLt3lCYTPIbzCek9XWQraNA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCxuSp3iNO9mzg0kP9Hx2e2w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCGJA5NpqHRio7P9fp8Gx1_g/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCdz3hjXTBS0ci8PRaAOQo8w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCcH--rBbrnJPC6h36APzdPQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ArchiveSocial"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/jobvite"
    },
    {
        "YouTube Channel": "https://www.youtube.com/playlist?list=PLfO6SFqcY2Ppi9ChL3_IpBuXlIHmGBxZf"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCEzfm-p8t6ZkMUr-zuL4hJw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCwXzD0O6zOCljGFsZphvb2g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCtQv2GgbGz8dqVAeYVcdP2A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCXY5wm6HlBL_Y_8SDxJNR0g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCwhfeX5jITNgzv-8igKIIwA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCSx3gfib9B2p9wi_shb1ljg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/FAROTechnologiesInc"
    },
    {
        "YouTube Channel": "[Qlik Help - YouTube](https://www.youtube.com/channel/UCFxZPr8pHfZS0n3jxx74rpA)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCyx2EEeONitePOJww0mpCbA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCNqm_euTHZz3o5OnKhUS-oA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnrquCvn7Kwxtbze4DIHkug/about"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCd3TJEMb_5wG2yBTWEeFWmg/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCulL_na5iknyjlupNk93QkQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/pingidentitytv"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/bluegroupinc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnjkrlqaWEBSnKZQ71gdyFA/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/MeridiumAPM"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCHwnqIuNU_-S-3w9oLrtFXg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UClK8V4mKfF1_paNzPIUJlHQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC4MbQECdktvwewRlAFwT_-w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCxLyxj95Rupg5grWzHHkQZA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC0HswXHHFzmiLtaDQafSZfg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCLjNp0gYJrXnYHhKD2xoQHQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/mailchimp"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCY_M0BRKYerXVLxyYnftc1w/videos"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/enterprisedb"
    },
    {
        "YouTube Channel": "https://www.youtube.com/surveymonkey"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6hdVbsn41BZxfIYmPUdCWQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCmhVYUCCOm0D5bT12MOr5_w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCMXxiVX0MU27GB-OU9saz9A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC0rd6xtCz2wDCOQrqAfgSKQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCZ_JmAcNaCl57KX90KcbVgA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCgqAsunNNk2ovT4IbjvZdBw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCavwJPW0dT7XCIGml5gDjdw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/hylandsoftware"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/HyperWorksUniversity"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC9Pb91desaNycPjyV_y9QQA/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/blackbaudinc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCuiogAh6174TT6ms4bEz3og"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCdZjlGDvWjRR20Nc2G57wxA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/RiverbedSupport"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6k61LnvJGuBpHqC0uuUQ-g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/renaissancelearning"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCOylzLjxDbZHFzDbHJiJhgw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/playlist?list=PLontYaReEU1seUE3ACG3sEc3zR7Br7URU"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/commvault"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCXYHCucpI6Bcthc8FEAqq5g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/manageengine"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCDsphqS5zEOSGd0SEne6tXg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/questsoftware"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCQ9Cqgig2JBRicwaU6ajGWg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCQZlBWgXgQwfbiekznvQbAg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/BluebeamPDFRevu"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC82q6eHj8seRP_4ihKfgO_Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UChaSIqY97TuAS6-OE52p40Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ecisoftwaresolutions"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/sonicwallvideo"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=os80yN3cW4Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCEE6kDLvxwnQbl9mgQPnAQw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCKjfp6cZloecCSZqprGpaLw"
    },
    {
        "YouTube Channel": "[WellSky YouTube Channel](https://www.youtube.com/channel/UCV8Gc1NJZpXpmZ1ZGICsqsQ)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC76ytU0iFsrCilg1ylL1QdQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCNF1Jp8AlhMaF7h63jugzxg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC9h9NaSI1sIfVJ71rRbNCww"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCeguVkeNZnT3DAq7R1l7Npw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6LjAUc6LyvLSwrEOMJaH_Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=py_VxZXlRNI"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/prospricing"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/eclinicalworks"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCNSR680o-2hMnHY1APDKaTg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCKRGGVbFeRC3Vy1my-GznJg?app=desktop"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCvQagFNHMrGgQpYunk4rHXg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCpYZxey8pvzZaXbU84VDhaw/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCJUWFJEUx4-NKnY7GktFR_w"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCYIHqmd2MLjBydK4WxSLYVg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/iPipelineInc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCzl1umXRnlzb7RiZ8rLRZcQ/addons"
    },
    {
        "YouTube Channel": "[WatchGuard YouTube Channel](https://www.youtube.com/channel/UC7G62OOhNrG6PbIKEg5DKXw)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/InterSystemsCorp"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/kronosinc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/thryv"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCdPS99jvXlv9HbUg0JeLiKw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/CAREERBUILDER"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6XsCNIUw_Ql7OS_f-9wTfw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/axwaysoftware"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/indiumsoft"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/iderasoftware"
    },
    {
        "YouTube Channel": "[HHAeXchange YouTube Channel](https://www.youtube.com/channel/UCcJjTodbMJC5s-dg9nt65FQ/videos?view=0&sort=da)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/windriverchannel"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=cen1enolWUg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCFhF6KS7u6EZiHyrH8kZ18A/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/intermediateam"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/avid"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCDJcySLLz7f7TYiTLVyX3Ig"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UClPslWPyHh-9Au6sJv1Ry8g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCZl2RGGyZnDdDPD_CUXjJgw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCuARmeHXO6kkI0AUt7WthZQ"
    },
    {
        "YouTube Channel": "[Netenrich - YouTube](https://www.youtube.com/user/netenrich)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/spscommerce"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=Vrz_HpdhMyU"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/wisetechglobal"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC9ZGZ11OvECk6EEVQe_NNwQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/vidsfromcsi"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCe7RtUjxLJMcYJVCy1I3ZUQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/TelestreamTube/featured"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ApprissInc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/yodleeinc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC3Ya5ZhK1SZocVdA_5QwGXg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCzqeN6O0aqK-RE1VTkv6osw"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCxIyaBxSKC-gLqOSX9AZaCw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCr5s7L82oBiFFGsnv3Kpujg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCLQu3VtyXmWHQ-f1jwQGmVw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCSlsR78rdbVuSSf6tDryPIA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/carahtechtv"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCRaoG_yCThbK6kT7U2qI2MQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/rosettastone"
    },
    {
        "YouTube Channel": "https://www.youtube.com/TradingTechTV"
    },
    {
        "YouTube Channel": "https://www.youtube.com/CognexTV"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ServiceSourceMKTG"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC1RDG4ros8JU-kkHd5eWrsQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UClkYSfPcsJlO68NQS_0YIAA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCFALJP_yxtJaBV4ZOPbtyyQ/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCmGaIw7Nb0c9xy7fClr-zvA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCYX7KMxetEuBT3VUMQAPrLQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/adventsoftware"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCk3fWvjqJznfoLK-ypAW8uQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCkv7HzBnDElse_SZqinXT6Q"
    },
    {
        "YouTube Channel": "[Cedar Gate Technologies - YouTube](https://www.youtube.com/channel/UCrjtVObp4Gu7B6nGIWaStzQ)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnuF3BTuq7FSqFBmSPpgqBQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/OmnitracsInc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCq4Q8_PkEFyOF_aDXaOwQOg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/stratacache"
    },
    {
        "YouTube Channel": "[Innominds Software YouTube Channel](https://www.youtube.com/channel/UC7LY6NzRPycYDa2-dbV5SeA)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/egainchannel"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCBAOqCdAKTkk-Ms-XWlkqEw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCqbg4etbFnCKoBAQI_pWQzg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCHmJMnHE9HBJnABZXGfdvqg/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCMSjb_RO1vmuvnkCvyGrN3A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCgiFcpQBsvdPPhFUPZVcBlA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC4OvD2yIbofl9l4dIlqSNMw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCYQkuep4lzixJYiCFjbzhGg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/incontact"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC9CZA-GnuPNdvnHLCnSCAhQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCrZ8c0YhhCe8ZCSoCiPwGMw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCcIoYrgo8Irq8bNR6Bpqdbg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC_a00qPp8sIOudVUyTkjXRQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCoAfgPxy7ITEpc-f6y1KvUg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCdPIiNX0S91bNHe8v6FHPjg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCeZWiaUL2tXVNUHVP81-ERg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCc1ZZDiAkChxDOY_2gVoheA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC0P-i5NBfnqW2Gsb2ARxKeQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCgvSHm-SpxgAHHYoSEu_X0Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/Gordian"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "[Sunrise Medical North America YouTube Channel](https://www.youtube.com/sunrisemedical)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/WebrootSoftware/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/thirdera"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/cmitsolutions"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/corebts"
    },
    {
        "YouTube Channel": "https://www.youtube.com/PrometheanVideo"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC96OIiBbACsC__FWFB2OsQA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCLUPhxMFOczFg1nl4GW0C2w"
    },
    {
        "YouTube Channel": "[Sunera Technologies YouTube Channel](https://www.youtube.com/channel/UCTvt0WElhJP4u4NLASoX6eQ)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UChNA_V7hTCyiO2ZqW-3uOZw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/PowerPlanInc"
    },
    {
        "YouTube Channel": "[ProlificsTV - Official YouTube Channel](https://www.youtube.com/user/prolificstv)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCy7jhgX7lqo13llN6NZr6Mg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCbQk_U5eGw4u_ua5cGGCUiw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=DQE_CwAmrjA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCBlBYajcNGVrvJiYHH6sjgQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCVvMbnOt5wTIJMVI2pCgAWA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCbd65iTSUbz0uRMHcXNOw-w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/Cignititechnologies"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=dchXqXj-xTc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC0qM1VL9SF3_gxrtekpUyCg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC9ZsE9jNgBuX36s-L3TI6-Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC222f88UA2jaKEdsqDl0YBg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCowR1CN0ZGSDB6EqjdnV9lg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnfuLo0671KTbAZGM-3YhaQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=ADBWqem5kdE"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ImprovingEnterprises"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCtbxGPqbVVYEZ8j1InV7NJQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/syncfusioninc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/microcenter"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCoTzNq8jEODzvc_g9ThwA6A"
    },
    {
        "YouTube Channel": "[Spireon Inc. YouTube Channel](https://www.youtube.com/channel/UCCa4BQRmcwEl1V9-1HB_opg)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCOC6zv-INCsFQSBzCLSstCQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/rmsconnection"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC3qdTJ3nUH3Gpgi9yqEPG8g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/CranePayments"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCffIEr51qGE8zjgsQ3ZD29Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/eInfochipsAnArrowCompany"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/proquestvideo"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/octannercompany"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCYp0cbqtyeqJCQbPrQyeevw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UChPq4wuXFbvPH61zVpllkOQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCbwyQh20U7n5yAMYa0XqwxA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/MercurySystems/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/CarestreamDental"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/TripwireInc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC_bktWm8wMCeEh7Ht3UhE-Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC477ap23fitAxSR_XYaz-KQ"
    },
    {
        "YouTube Channel": "[Sparta Systems YouTube Channel](https://www.youtube.com/user/spartasystems)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCR3fLsvnZ8ecZoUSQNKs3hQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/tradestation"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/MEDHOSTInc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UChLT7ECAFIwGS3-NzxPfkVQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCkfojeIzWdPTAmL4bLeewQw"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCO8u07LN9L86GVBg1p1ZBZg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC-XKHlvKBxzcnSMN1QUnMSA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/GlobalStep"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/TeleVoxSoftware"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC1nzmktP1usjdqewrBDN_uQ"
    },
    {
        "YouTube Channel": "[LiquidHub - YouTube Channel](https://www.youtube.com/channel/UCXRwIeFJgKJW3tJ6iM4c7yQ)"
    },
    {
        "YouTube Channel": "[MAQ Software YouTube Channel](https://www.youtube.com/user/maqsoftware)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCKPV-MZsP8eYhcdqL5cyLeA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCX_WqgC5i-apoDJud1Ke0KA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC5-hSeEmLrz8dvnFp_oLgmA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/YouTube"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/GalaxESolutions"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnSlZgjU_ie1luqsYGnoHSw/videos"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCtW8T73_XoFEjf0BRvR222g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/AISOnDemand/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCNPNDyha_eFI9yopHvn4Lsg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCy21pJcLIfThj3AtBbSeWDw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/biamptraining"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCTZ2wIdBHEDGjT_1RicAaKw"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCJZbmRVEkRD5C7S44_sL-Lw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCAt8500vlyDN4o94uvYHIoQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/thecalsoftinc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC-DdNmOGTVwV385BNxdMTCQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCzsR2HlR5rt_LDosW85xrWw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/spokvids"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/GrazittiInteractive"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCYZDDfxKR0P85z6vsDVaSiw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCXKqLIaB-7qv16xW-yfz9Sw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCb3zCCQyxbWiRkvo6p0igUA"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/KollmorgenMotion"
    },
    {
        "YouTube Channel": "[AdhereHealth LLC. YouTube Channel](https://www.youtube.com/channel/UCf9vXXqPPlzaSD4qCjM7ZdQ)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCIie8uTejaag9tolpy4H_zg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=MtcWhiiBgps"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCuuUrTEI7xbgyaKsAciJDMQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC5HgXWaX8DEbTh2vAMvv7iA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCRwtI2VKkVdh-i2cuOKrchg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC7HIKvcMV1VgHdDkn0KhSxQ/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCwGfHQ1-g6pE70x4DGuFWVg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/skywardk12"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCOdD1Dl9NsXbuUvuKHKquRQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCRttfRo2G_Vp8pPFGqDKVwQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCAxqSPZTzYgCq4skx3Rl1KA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC61GUd71XNbKC2Rfa_suyvQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC-GcDZyK980uY7t9E_7HxGg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC1pDMQF-E5YNgBgqc0MK6lQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/MetaverseModSquad"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/advantedgehealthcare"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCgYuPUr7sOG6WTo5jDiWL9Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/SmartronixChannel"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCCH0KbL9MLk8bMHHuBbqKdw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCe_u3-pJQl3DMNwpa_QptGg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCXgxr9PQQrzjwUB-9SzZ7Qg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/FrontStreamPayments1"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCCnzVhPmusXKpchtYocAoNg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/Toshibacommerce"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC2IAMD5GQYN0yIzhU33OybA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCY2hL91348SM7aF7UgDxleA"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6YIe2ArdZ_K7ho0XLqgYgQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCBwe1___CpulFjtn4sqZyYw/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCGwNeLjTrAeD9wTAqEGcy0w/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC5T3yqQHP2sXWmnyYmUlKBg/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCkL1Oui0h0TIkSgy3FdvK_g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCXhhtzH9VZ8FCkpLPykH81A"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCLow6O_IcWYpADCXdcEiW8A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCw2nmJ-hyvdqVrTLVeNnNlA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC2kyfjZNXSPLwUyPYaYPsdg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/dspacevideos/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC2ZmbB4PpU5Kf-hOE_ID_9g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UChJYr5PSMguHC56HWJSwiyQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=bmY6VdBg0Dw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCsni6m8sB8GgxnG5AeFWrlQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UChtgGIEcnLr5SmbAWM8Tc_g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/Decisionone"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/DataDimensions"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC77pJwP8HOyl31rwxN0ksmQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCaFMzzHjnfCaIM-3Uf8m5qQ"
    },
    {
        "YouTube Channel": "[Bitwise Inc - YouTube](https://www.youtube.com/channel/UCzrfFhBffJ8KQfmiW3v0CNw)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCk_C9qaEFBWoR02nopBXFiA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/CalibreSignature/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCVTAHvwVsS0A1Yoht-SEZkg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/benqglobal"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCatEblW8z_HBod23zlUKIGQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/cyberlinkchannel"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCiM6k6vMnISLVp51tC_KLpQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/elinext"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/virtualemployee"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/AscendumSolutions"
    },
    {
        "YouTube Channel": "[Pontoon Solutions YouTube Channel](https://www.youtube.com/channel/UC_9nj8tZeTJxFwjqUh_fK7Q)"
    },
    {
        "YouTube Channel": "[Official Instron YouTube Channel](https://www.youtube.com/channel/UCktsUALgwj2BA0GGOKVUYcg)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCO9Or2QmRjUDHTtFbXddeGA"
    },
    {
        "YouTube Channel": "[Vishay Precision Group YouTube Channel](https://www.youtube.com/user/vishayprecisiongroup)"
    },
    {
        "YouTube Channel": "[Planned Systems International YouTube Channel](https://www.youtube.com/channel/UC9mhqrszY5Jp_i1AKyDralQ)"
    },
    {
        "YouTube Channel": "https://m.youtube.com/channel/UC0A-W5pcvYwv9OZXZeLaP6w/about?disable_polymer=1"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCmOMOQKzgVzaMVIwRO1yO4Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCamPgA6MxGvg2T38QY1wOSQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCLuA9iyTVA1AkWfjagoZYQA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCrs5fxrlkxLxt33ypYAqAdA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCrOwnGXDpFNUiaLHf-JIzFQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/christieDigital"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCCdHnpp6qdy4ro9c_rMS1Sg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCQyx1nPGGIjkIwZeOBEgQxg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCKhlOy2NRb1JC4lHTLiwQ5A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=t509yRPUycU"
    },
    {
        "YouTube Channel": "https://www.youtube.com/innovecs"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCZliWfVoWosL45Xdi2RckSQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/csginsights"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCqmKU4-6TLi9V4Q7o5VyWag"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCzS6ZbSRBcPKo4h9OATDqAA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCfRxtuaaxMfxSAkKNoN7DBg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/softvisionteam"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC5cJ-p137PsIJMBvoSom2CQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC-NSFtKyjbcTTdgJhmKVF1g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCBZqUHA2vnZmsIwwavVGN3A"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=EFq7fsoXOHU"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC3VgyysRIEnartLovVpDJOQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6NNk23EKzIJzzXQanMWd-A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/rapiscansystems"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCQ747zdWSoIm3fqmghqFcJQ"
    },
    {
        "YouTube Channel": "https://m.youtube.com/watch?v=6r2VPSMHkms"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC9tISCW5q8lGqqnmmG-J0_w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/cignexglobal"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCV2CQbvsi9rbNXsdlMqKPcQ/about"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/premiumparking"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/DandyWalkerAlliance"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/LeviRayShoup"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCOWsxY1u6MmucKceG56KMXw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCV93uVMtNRWJblhrxa29_vQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCcIKW6slq_kZ6Y93KPH_QyA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC1_CpVsVSZTcFatDNUeIBQw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCx3JDy3WBXhgPaApOSQeHfA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCkjbZtz4Yc9k-DJhZlVHoJw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCDWenKDdXgkQ5-1rsCMbIQg"
    },
    {
        "YouTube Channel": "https://m.youtube.com/channel/UCF2rKmWw7MJHC6tIAwA8Baw/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC1mz7r1PDVmERAOMRbTAXMA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCbLT8DIs076_FYhzWmrMTeA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCBmdKrUohHuxomPtE9phXkQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCRVdFy0DLWhIApG8LWDzV1w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCaffmLdV1azNuSTGhoM3SYg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCZ3RFp3cG7YpcobsRGzYAXw/community"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCfTchINQmrDJMjGYGoFwnhQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCXpgiNypcRdoIG_PdIKIA3g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCmnT2CkV3Ww7mq2J4m8I7Rw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC2Gbe7zlN70KvchvDeIwQVw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/avidxchangeinc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6dRCyPz9WezzA_YpuH1G-A/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnKu7h9E8xxV6gA2WSppwFw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCzywdH92ahgqlQCz-6lY_WA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCvIR-gZFzIK38XhYFmvDZ0Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/dialogiccorp"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCvz9etrYdZkFgZprLVCpnXg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCeHmxsoyE7X0S3FVt4lilWg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC7ONeZ8d3GThg9CnxsZqslg"
    },
    {
        "YouTube Channel": "[Allen Lund Company YouTube Channel](https://www.youtube.com/channel/UCwogm8mwL5bu0cUJSm-7aDQ/videos)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/AurigaPR/about"
    },
    {
        "YouTube Channel": "[Technosoft Corporation YouTube Channel](https://www.youtube.com/user/TechnosoftCorp)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCV9QCotdg5alwaG6oI6ZWgQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UClSo-PQ3vrKr9a5b9dyZHog"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/SCRAMSystems"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=tsIr-RQ7atM"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCK60vuP3lpGad5-gpqKh1xA"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCbik2UMdKbeqa25-syU0MSA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCB4u6BndKM9_vqeYNo69DhA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/nexantinc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC5LvITTYqchG7zU7y8W8Jsg/about"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCOmTZ4FjwTB5J9AR42gkxTQ/featured"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCBxKa_30KsvBanrAxPMALJA/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCpDoOWR212YK3D_7Iyve3pQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC9Zs20DoNuxwLcc9CiL-D6Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCFqNwisE02vnMmX7drTXCKg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/jdpowercorporate"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCqj7Ai0CkX4dLWMnNb6TeIA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=mTuIOeI7q3w"
    },
    {
        "YouTube Channel": "[StratusVideoSolution - YouTube](https://m.youtube.com/user/StratusVideoSolution)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCkSKORyka0f9vrvULWzCyfA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCjgJWnBgQGvAY3oRJs21sug/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCgoibmwrViekZvJasPgZ-7w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCYf_4dQ2xuriaS5jWxf8TIw/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCFQel8mYE3zR-PmkXKOmXBQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/automatedlogic"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCg4cy0SGxowNxLAGfsxfUJA"
    },
    {
        "YouTube Channel": "[Enservio YouTube Channel](https://www.youtube.com/channel/UCvlgZnkA1oKXttaUcFGxgNw)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/TheJeppesenChannel"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCZD4jDrEEvBVH1atmJ5VmZQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCyDgLDsSVG61O-b5zoM-2yA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCVlk1eQ7Ew_20nhVZv2TSyQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC5sTJrWhDnjaF8hFV73lx0g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=kNaxF8gfui4"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCpTs-wiW_zPfC8iqCSJxLpw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCu5YsdDHVRQeH-7Cla8j_Jg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCpvhIuZlMDNBPYpacTVuFHg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6n_cVQDorazK3pbidZTBvg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCzRLR0ZP8AMdGfi2QbXDZDA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCca22AhR4s-k_X3dXaIB44w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/suzohappna"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC-AOwc7Q02hWYxtxD70v6fA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCqI-7Ca9i9UUbkS2Ejh16lQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCP2-S6-M9ZvlY8t7cRn4O6A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCX9EDv5J1MDQ0XgunY6b3jg"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/CTGNorthAmerica"
    },
    {
        "YouTube Channel": "[ITCube Solutions Pvt. Ltd. YouTube Channel](https://www.youtube.com/channel/UCDOHcKc0KzgDPSaigw-GeTQ)"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCKX3fNTsdLPOkhfVRUEhwtg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/chicagolighthouse"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC4AS3ZMyG81FvGj8l6DiFSg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCgCdUHUE40wQk7t0faj70zg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCoOho1Qyjp0mV8l1Bf99zTg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCGJ4TR3eeNJ-fzDYkFpV_VA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6FYPmQz95oLdVnhmXmt86g"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCRyVOxW2fNXZ_Y4be_bt8Nw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/playlist?list=PL0x82WZAVmYC8594QawsG9V6JWlduCEYA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCJBZmtiNRrNsachn49YdcWg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ustoolgroup"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnCqpBeMjsQYKO-XCmxcJQg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCe6ZyaNUBGKzh6n8jCoPjbg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCma3yFf-hHxQA90Mal3Biwg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=7PNwOdkb3Zc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=khUJimqS1ms"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/revisioneyewear"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnUdtyBhtdElqnU3Yn7wb5Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC07-dOwgza1IguKA86jqxNA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC9TVp-ezXkhhJ9gOqdrfmrA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCoblbDUZLWiOdA_Q2MLMGdA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6YbYxqnvlkRCLrHJSRKk8w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCgGd_fx6eZ6Csu8WZixQxSQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/MiTekUSA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC-CoTZFebpA1UwVERXAjaFg"
    },
    {
        "YouTube Channel": "[IT SCIENT - YouTube](https://www.youtube.com/channel/UCMhbR5koKarSJjlDtA8-GfA)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCgJlgBwsepof09mBOybHUyg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCfDQ1TvY7tq60rPORGMdokw"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCOE9cLDoIQtE5Co1rtfQCAQ"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCdYZsK5AtOv3UKpLXnuVeQQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCAQDo4IbLXiO9KViPMj2QMQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCw78cRnjcDvwstzmVa5-18Q/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/europeanresearchcouncil"
    },
    {
        "YouTube Channel": "[NewNet Secure Transactions - YouTube](https://www.youtube.com/channel/UC7q12MV97C1SzYM49jH6nlQ/)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/Radancy/videos"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC4DmyPkgJXOfGZ9XKswILIw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCACxKmAr63L68YDSc7z2-eA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCxrQzpKPvwi2QHRhSF4zffA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCIH0IV6s_gOAONmDnUtzFFg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCuVbhorskI761hEDUwqSHNA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCeArrrquD18eco-xeoPVNIQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/frontrange"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCGHkgrPCUewFiPQd7hKzBiQ/featured"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCn4fQRo6vdgmi_N4fTbjjDA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCi4ITZpjkVb-v1eBqVrG01g/videos"
    },
    {
        "YouTube Channel": "[Catalyst Business Partners - YouTube](https://www.youtube.com/channel/UCwZNNPIzg1W1zxfvy2BfZWw)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCCmm9vtblvGS8rPcv_xEMhg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/lifecycleengineering"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCd6e8kewIfrNAZTmEwKxNrA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/WillowTreeApps"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCb16S41Ud24-XuK1RLXxNjA"
    },
    {
        "YouTube Channel": "https://m.youtube.com/user/AppliedImaging/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCPRpEjZfOfxF2buR9BcKz-A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCYi2szz9tnzX_-i4IKZ5Ngw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCBEJNbayKBzrwL6kkj0yfqw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCVX75AE6_LebLMB-fffk6OQ"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ISNetworld"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCyWwBrArC078HbZF1Ax0hdg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC4nfO4HqnVWXg3RrKMS9PSg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC-ui22CW4FfRtr87bMQzDgQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCqcUo58SeukpWsM7h6blPUA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCuO2l7e6_gGN5GVIhYfl0SQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCcR4f9o-VpA3kIo-i13gOKA"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCTS2BPA7rPNTkEYQhNrkv1w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/sjerhombus"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=MveZvUYtgos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=e9oKiEmD694"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC_gep-g0bPQ12cl-pmrostQ/playlists"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCmqyLXPtSW9u8lXXV3cWFLQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCF1li8L8kClsAZd3r7zK7ZQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCxUG0-QrtZ6zzPUM36l88jA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCxToTRL97oX-uGl3sfWg6Fg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/playlist?list=PL0pnSxnJod7QcG35aTPHOr_1IM54OKUDs"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC_CHNBUiCx2LjpXAqzFNO1g?app=desktop"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCOqZBY4Te-n2fK6dziRBgnw"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCgdDOsuhUXqHGXgUrInoS6w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCG0kwKZW_uJDUsFVMkggc6Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCBkzlBquzRb2405cU2lcSUg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCntiMlVbfY5pO6XOJ8v8aVQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=-H0w9ZvtaoI"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/kerridgecs"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCJslVEYqu7hM5OdYY5e0Ngw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCe9vFMxeDGBx_Vo3WJCmp7g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/playlist?list=PLo_7M8Mw8AQoBGNfdkgLevGkV3q8_fNvA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/timocom"
    },
    {
        "YouTube Channel": "[HubSpot - YouTube](https://www.youtube.com/channel/UCaAx1xeTgF3rs4rBPDq6-Kw)"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCTfVKNgZ_mlTDqrZoytgnPA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCG5FiTLeLMtOltL3aKxgkdg"
    },
    {
        "YouTube Channel": "[KCS Technologies YouTube Channel](https://www.youtube.com/channel/UCTB-f5pzeNCNNXH7qZUxJTQ)"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCQeUlH4Ygu4KsXn0VU5KuAg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCZpp_ryOYe5JPqxrLfZf96A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCwfLI-bSCywgoDMVpEZV8sg"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCiYzQCbkFd-6vlcSWutesHw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCl-M9dloJFvy5vWlDkFGf3w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/Palm"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/navmanwirelessuk"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCMjrou0EqVAH-ul1nwIkNMQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC7FF5yZ2aTZTq9PyCZfDzKw"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCcwe1QtYmXf-sPrdOdhWi4g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCxFIISWgJx8eY4CyaveXL4A"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=CFVvfG6Fa_4"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC78zNKPMNvXBug_xwm4QqBA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnSlZgjU_ie1luqsYGnoHSw/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC54Q5nMtE9LMcC_9HtqUy-g"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCeIQskXc99nML8y3C7F9pOQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=PmuREnrRXzI"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=ryZvRRInu0w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC6iUjE4_YMjcx9umDtpqjag"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCyXcenqvMBW_bo-0fdoV0_Q"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/IpswitchFT"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCFEhz60hgvUC9__NZHAba-g"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCyV079-l3V_uLWI7fAYncgA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCnGgbnoIw4gPzB-co4tj2jg/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCJ5p1M1V6as7ye3ypyXKImw"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/oVirtProject"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ElsterGlobal"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/rsystemsgroup"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/itzsolved/featured"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCNWVtkJ4gq6xwtqjub01cog"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCNJ_F74WZnzO5oGGO348d9w/videos"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/ultrasoftware/featured"
    },
    {
        "YouTube Channel": "Not Found"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UC3MT7wbgAZrZNS6NPI03LUQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/fultonstreetcollective"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/360GRC"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCrPAUuZzmo46H5fn0_iUb4w"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/360jobinterview/videos"
    },
    {
        "YouTube Channel": "https://www.youtube.com/watch?v=v9Jm1sa-dLc"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/namecheap"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCfe3tg_wUSIpaeBEnNJBxeQ"
    },
    {
        "YouTube Channel": "https://www.youtube.com/channel/UCNPqQ9zjNXFe7C83KuOKRCA"
    },
    {
        "YouTube Channel": "https://www.youtube.com/user/RamcoSafetyShields"
    }
]

async function scrapeVideoSections(channelData) {
  const browser = await puppeteer.launch({ headless: false });
  const results = [];
  const page = await browser.newPage();

  for (const channel of channelData) {
    const url = channel["YouTube Channel"];

    try {
      console.log(`Processing URL: ${url}`);
      await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

      await page.waitForSelector('yt-tab-shape[tab-title="Videos"]', {
        timeout: 20000,
      });

      await page.evaluate(() => {
        const videoTab = document.querySelector(
          'yt-tab-shape[tab-title="Videos"]'
        );
        if (videoTab) {
          videoTab.click();
        } else {
          throw new Error("Videos tab not found");
        }
      });

      await page.waitForFunction(
        (originalUrl) => window.location.href !== originalUrl,
        { timeout: 20000 },
        url
      );

      const videoSectionUrl = await page.evaluate(() => window.location.href);

      console.log(`✅ Processed ${url}`);
      console.log(`Video section URL: ${videoSectionUrl}`);

      results.push({
        "YouTube Channel URL": url,
        "Video Section URL": videoSectionUrl,
        Status: "success",
      });
    } catch (error) {
      console.error(`❌ Error processing ${url}: ${error.message}`);
      results.push({
        "YouTube Channel URL": url,
        Status: "error",
        "Error Message": error.message,
      });
    } finally {
      await page.goto("about:blank"); // Navigate to a blank page before the next iteration
    }
  }

  await page.close(); // Close the page after the loop
  await browser.close();
  return results;
}

async function saveResultsToFile(results, filename) {
  try {
    await fs.writeFile(filename, JSON.stringify(results, null, 2));
    console.log(`Results saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving results to file: ${error.message}`);
  }
}

scrapeVideoSections(channelData)
  .then(async (results) => {
    console.log("Scraping completed. Results:");
    console.log(JSON.stringify(results, null, 2));

    // Save results to a JSON file
    await saveResultsToFile(results, "youtube_channel_results.json");
  })
  .catch((error) => {
    console.error("An error occurred during the process:", error);
  });
