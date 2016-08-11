/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function onRecievePushNotification(params){
    alert("Message id - " + params.rkMsgId);
    
    var success = function(message) {
        
    }
    
    var failure = function() {
        
    }
    
    rokomobi.addEvent({name: "PUSH - " + params.rkMsgId}, success, failure);
}

function onHandleDeepLink(message){
    var text =  message.name + ' - name \n'
    + message.createDate + ' - createDate \n'
    + message.updateDate + ' - updateDate \n'
    + message.shareChannel + ' - shareChannel \n'
    + message.vanityLink + ' - vanityLink \n'
    + message.customDomainLink + ' - customDomainLink \n'
    + message.type + ' - type \n'
    + message.referralCode + ' - referralCode \n'
    + message.promoCode + ' - promoCode \n'
    console.log(text);
    alert("onHandleDeepLink");
}

function getValById(id){
    var value = document.getElementById(id).value;
    if(value==""){
        return null;
    }
    return document.getElementById(id).value;
}

var app = {

    setUser: function(){
        var success = function(message){
            alert("OK "+ JSON.stringify(message));
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        var inUserName = getValById("inUserName");
        var inReferralCode = getValById("inReferralCode");
        var inShareChannel = getValById("inShareChannel");

        rokomobi.setUser({userName: inUserName,referralCode:inReferralCode,shareChannel:inShareChannel},success,failure);
    },
     // "userName", "email", "password", OPTIONAL: "ambassadorCode", "linkShareChannel" 
    signUp: function(){
        var inUserName = getValById("inLogin");
        var inPassword = getValById("inPassword");
        var inEmail = getValById("inEmail");
        var inAmbassadorCode = getValById("inAmbassadorCode");
        var inLinkShareChannel = getValById("inLinkShareChannel");
        var param = {
            userName:inUserName,
            password:inPassword,
            email:inEmail,
            ambassadorCode:inAmbassadorCode,
            linkShareChannel:inLinkShareChannel
        };
        var success = function(){
            alert("OK "+JSON.stringify(param));
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.signupUser(param,success,failure);
    },
    login:function(){
        var inLogin = getValById("inLoginLogin");
        var inPassword = getValById("inLoginPassword");
        var param = {
            userName:inLogin,
            password:inPassword
        };
        var success = function(message){
            alert("OK "+JSON.stringify(message));
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.login(param,success,failure);

    },

    logout: function(){
        var success = function(){
            alert("OK");
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.logout("",success,failure);
    },

    createLink: function(){
        var inCreateLinkName = getValById("inCreateLinkName");
        var inLinkType = getValById("inLinkType");
        var inSourceUrl = getValById("inSourceUrl");
        var inChannelName = getValById("inChannelName");
        var inSharingCode = getValById("inSharingCode");
        var param = {
            name:inCreateLinkName,
            type: inLinkType,
            sourceURL:inSourceUrl,
            channelName: inChannelName,
            sharingCode:inSharingCode
        };
        var success = function(message){alert("OK "+JSON.stringify(message));};
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.createLink(param,success,failure);
    },
    shareWithUI:function(){
        var inContentId = getValById("inShareContentIDWithUI");
        var param = {
            contentId:inContentId
        };
        var success = function(){
            alert("OK");
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.shareWithUI(param,success,failure);
    },
    shareCompleteForChannel:function(){
        var inShareChannel = getValById("inShareChannel");
        var inContentId = getValById("inContentId");
        var success = function(){
            alert("OK");
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        var param ={channelType:inShareChannel,contentId:inContentId};
        rokomobi.shareCompleteForChannel(param,success,failure);
    },
    addEvent: function(){
        var inEventName=getValById("inEventName");
        var inParamName=getValById("inParamName");
        var inParamValue=getValById("inParamValue");
        var success = function(){
            alert("OK");
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        var param = {inParamName:inParamValue};
        rokomobi.addEvent({name:inEventName,params:param},success,failure);
    },
    loadPromo: function(){
        var inPromoCodeLoadPromo = getValById("inPromoCodeLoadPromo");
        var success = function(message){
            alert("OK "+JSON.stringify(message));
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.loadPromo(inPromoCodeLoadPromo,success,failure);
    },

    markPromoCodeAsUsed:function(){
        var inMarkPromoCodeAsUsed = getValById("inMarkPromoCodeAsUsed");
        var inValueOfPurchase = getValById("inValueOfPurchase");
        var inValueOfDiscount = getValById("inValueOfDiscount");
        var inPromoDeliveryType = getValById("inPromoDeliveryType");
        var success = function(message){
            alert("OK "+JSON.stringify(message));
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        var param = {
            promoCode:inMarkPromoCodeAsUsed,
            valueOfPurchase: inValueOfPurchase,
            valueOfDiscount: inValueOfDiscount,
            deliveryType: inPromoDeliveryType
        };
        rokomobi.markPromoCodeAsUsed(param,success,failure);
    },
    loadReferralDiscountsList: function(){

        success = function(message){
            alert("OK "+JSON.stringify(message));
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.loadReferralDiscountsList("",success,failure);
    },
    markReferralDiscountAsUsed: function(){
        var inDiscountId = getValById("inDiscountId");
        var success = function(message){
            alert("OK "+JSON.stringify(message));
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.markReferralDiscountAsUsed(inDiscountId,success,failure);
    },
    loadDiscountInfoWithCode:function(){
        var success = function(message){
            alert("OK" + JSON.stringify(message));
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.loadDiscountInfoWithCode("DCCBAJFR",success,failure);
    },
    activateDiscountWithCode:function(){
        var success = function(message){
            alert("OK");
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.activateDiscountWithCode("FJAUX8Y7",success,failure);
    },
    completeDiscountWithCode:function(){
        var success = function(){
            alert("OK");
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.completeDiscountWithCode("DCCBAJFR",success,failure);
    },

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    inviteFriends: function(){
        var success = function(){
            alert("OK");
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.inviteFriends("",success,failure);
    },
    getPortalInfo:function() {
        var success = function(message){
            alert("OK "+JSON.stringify(message));
        };
        var failure = function(message){
            alert("Error calling plugin "+JSON.stringify(message));
        };
        rokomobi.getPortalInfo("",success,failure);
    },
    getSessionInfo:function(){
        var success = function(message){
            alert("OK "+JSON.stringify(message));
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.getSessionInfo("",success,failure);
    },
    getUserInfo:function()   {
        var success = function(message){
            alert("OK "+JSON.stringify(message));
        };
        var failure = function(message){
            alert("Error calling plugin "+message);
        };
        rokomobi.getUserInfo("",success,failure);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.querySelector("#setUser").addEventListener("touchend",app.setUser.bind(app));
        document.querySelector("#signUp").addEventListener("touchend",app.signUp.bind(app));
        document.querySelector("#login").addEventListener("touchend",app.login.bind(app));
        document.querySelector("#logout").addEventListener("touchend",app.logout.bind(app));
        document.querySelector("#createLink").addEventListener("touchend",app.createLink.bind(app));
        document.querySelector("#shareWithUI").addEventListener("touchend",app.shareWithUI.bind(app));
        document.querySelector("#shareCompleteForChannel").addEventListener("touchend",app.shareCompleteForChannel.bind(app));
        document.querySelector("#addEvent").addEventListener("touchend",app.addEvent.bind(app));
        document.querySelector("#loadPromo").addEventListener("touchend",app.loadPromo.bind(app));
        document.querySelector("#markPromoCodeAsUsed").addEventListener("touchend",app.markPromoCodeAsUsed.bind(app));
        document.querySelector("#loadReferralDiscountsList").addEventListener("touchend",app.loadReferralDiscountsList.bind(app));
        document.querySelector("#markReferralDiscountAsUsed").addEventListener("touchend",app.markReferralDiscountAsUsed.bind(app));
        document.querySelector("#loadDiscountInfoWithCode").addEventListener("touchend",app.loadDiscountInfoWithCode.bind(app));
        document.querySelector("#activateDiscountWithCode").addEventListener("touchend",app.activateDiscountWithCode.bind(app));
        document.querySelector("#inviteFriends").addEventListener("touchend",app.inviteFriends.bind(app));
        document.querySelector("#getPortalInfo").addEventListener("touchend",app.getPortalInfo.bind(app));
        document.querySelector("#getSessionInfo").addEventListener("touchend",app.getSessionInfo.bind(app));
        document.querySelector("#getUserInfo").addEventListener("touchend",app.getUserInfo.bind(app));
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();