//event network-changed script-path=proxy-auto-switch.js
//version: 1.0
//telegram: @docofcard

//根据SSID和MCC-MNC自动切换ProxyGroup
//使用方法:请根据自己的需求改动脚本内容，将脚本放到surge文件夹内,然后在文本模式下将代码复制到[script]下
//TwitchSwitch = type=event,event-name=network-changed,script-path=proxy-auto-switch.js

//通知（不喜欢英文自己改中文）.
let TITLE = '代理模式!';
let SUBTITLE_CELLULAR = '蜂窝网络: ';
let SUBTITLE_WIFI = 'Wi-Fi: ';
let Proxy_UK = 'ProxyUK代理模式: ';
let Proxy_HK = 'ProxyHK代理模式: ';
let ABOUT_IP = 'IP: ';
//let CHINA_MOBILE = "中国移动";
//let CHINA_UNICOM = "中国联通";
//let CHINA_TELECOM = "中国电信";
//let CHINA_TIETONG = "中国铁通";

//ssid 连接特定WiFi时切换规则（改为你自己的SSID）
let UKWiFi = [
            "UK_ssid1",
            "njbb",
            "UK_ssid2"
    ];
let HKWiFi = [
            "HK_ssid1",
            "HK_ssid2"
    ];

//mcc-mnc 使用特定漫游SIM卡时切换规则（改为你自己的SIM卡MCCMNC, 查询https://cellidfinder.com/mcc-mnc）
let UKCarrier = [
            "234-33",
            "234-20",
            "234-91"
    ];
let HKCarrier = [
            "454-00",
            "454-07",
            "454-12",
            "454-14"
    ];

//根据wifi-ssid和mnn-mnc来切换规则；
let Direct = "DIRECT";
let Reject = "REJECT";

//根据wifi-ssid切换规则;
let NETWORK = "";
if ($network.v4.primaryInterface == "en0") {
    NETWORK += SUBTITLE_WIFI + $network.wifi.ssid;
    if (UKWiFi.indexOf($network.wifi.ssid) != -1) {
        $surge.setSelectGroupPolicy('🇬🇧ProxyUK',Direct);
            ABOUT_IP += $network.v4.primaryAddress;
            $notification.post(TITLE, NETWORK, Proxy_UK + Direct + '\n' + ABOUT_IP);
            $surge.setSelectGroupPolicy('🇭🇰ProxyHK', Reject);
    } else if (HKWiFi.indexOf($network.wifi.ssid) != -1) {
        $surge.setSelectGroupPolicy('🇬🇧ProxyUK',Reject);
        $surge.setSelectGroupPolicy('🇭🇰ProxyHK', Direct);
    } else {
        $surge.setSelectGroupPolicy('🇬🇧ProxyUK',Reject);
        $surge.setSelectGroupPolicy('🇭🇰ProxyHK', Reject);
    }

//根据mcc-mnc切换规则;
}else if ($network.v4.primaryInterface == "pdp_ip0") {
    NETWORK += SUBTITLE_CELLULAR + " " + $network['cellular-data'].radio;
    if (UKCarrier.indexOf($network['cellular-data'].carrier) != -1) {
        $surge.setSelectGroupPolicy('🇬🇧ProxyUK',Direct);
        $surge.setSelectGroupPolicy('🇭🇰ProxyHK', Reject);
    } else if (HKCarrier.indexOf($network['cellular-data'].carrier) != -1) {
        $surge.setSelectGroupPolicy('🇬🇧ProxyUK',Reject);
        $surge.setSelectGroupPolicy('🇭🇰ProxyHK', Direct);
    } else {
        $surge.setSelectGroupPolicy('🇬🇧ProxyUK',Reject);
        $surge.setSelectGroupPolicy('🇭🇰ProxyHK', Reject);
    }


//    if (CARRIER == "460-00" || CARRIER == "460-02" || CARRIER == "460-07") SUBTITLE_CELLULAR += CHINA_MOBILE;
//    else if (CARRIER == "460-01" || CARRIER == "460-06" || CARRIER == "460-09") SUBTITLE_CELLULAR += CHINA_UNICOM;
//    else if (CARRIER == "460-03" || CARRIER == "460-05" || CARRIER == "460-11") SUBTITLE_CELLULAR += CHINA_TELECOM;
//    else if (CARRIER == "460-20") SUBTITLE_CELLULAR += CHINA_TIETONG;
//    NETWORK += SUBTITLE_CELLULAR + " " + $network['cellular-data'].radio;
//    changeOutboundMode(Cellular);


}

$done();
