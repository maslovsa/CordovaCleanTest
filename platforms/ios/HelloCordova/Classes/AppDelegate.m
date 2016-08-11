/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  MyProject
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"
#import <ROKOMobi/ROKOMobi.h>
#import "ROKOLink+ROKOLinkMapper.h"

@interface AppDelegate () <ROKOLinkManagerDelegate>

@property (nonatomic, strong) ROKOPush *pushComponent;
@property (nonatomic, strong) ROKOLinkManager *linkManager;

@end;

@implementation AppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    self.linkManager = [[ROKOLinkManager alloc] init];
    self.linkManager.delegate = self;
    // Register for Apple Remote Push Notifications
    [[UIApplication sharedApplication] registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge) categories:nil]];
    [application registerForRemoteNotifications];
    
    // Handle the case when application has opened from click on notification
    NSDictionary *remoteNotificationInfo = [launchOptions objectForKey: UIApplicationLaunchOptionsRemoteNotificationKey];
    if (remoteNotificationInfo) {
        [self application:application didReceiveRemoteNotification:remoteNotificationInfo];
    }
    
    self.viewController = [[MainViewController alloc] init];
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    self.pushComponent = [[ROKOPush alloc]init];
    
    [self.pushComponent registerWithAPNToken:deviceToken withCompletion:^(id responseObject, NSError *error) {
        if (error){
            NSLog(@"Failed to register with error - %@", error);
        } else {
            NSLog(@"Success registration for push - %@", responseObject);
        }
    }];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [self.pushComponent handleNotification:userInfo];
    
    NSString *json = [[NSString alloc] initWithData:[NSJSONSerialization dataWithJSONObject:userInfo options:1 error:nil] encoding:4];
    NSLog(@"push json - %@", json);
    CDVViewController *conroller = (CDVViewController*)self.window.rootViewController;
    UIWebView *webView = (UIWebView*)conroller.webView;
    [webView stringByEvaluatingJavaScriptFromString: [NSString stringWithFormat:@"onRecievePushNotification(%@)", json] ];
}

// Universal opening
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    [self.linkManager continueUserActivity:userActivity];
    return YES;
}

// URI opening
-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    [self.linkManager handleDeepLink:url];
    return YES;
}

#pragma mark -
#pragma mark ROKOLinkManagerDelegate methods

- (void)linkManager:(ROKOLinkManager *)manager didOpenDeepLink:(ROKOLink *)link {
    // Handle opening
    // Example below simply displays link’s description in standard iOS alert
    NSString *title = @"ROKO Link";
    NSString *text = [link description];
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:title message:text preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *action = [UIAlertAction actionWithTitle:@"Ok" style:UIAlertActionStyleCancel handler:nil];
    [alert addAction:action];
    [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alert animated:YES completion:nil];
    
    
    NSDictionary *representation = [EKSerializer serializeObject:link withMapping:[ROKOLink objectMapping]];
    NSString *json = [[NSString alloc] initWithData:[NSJSONSerialization dataWithJSONObject:representation options:1 error:nil] encoding:4];
    CDVViewController *conroller = (CDVViewController*)self.window.rootViewController;
    UIWebView *webView = (UIWebView*)conroller.webView;
    [webView stringByEvaluatingJavaScriptFromString: [NSString stringWithFormat:@"onHandleDeepLink(%@)", json] ];
}

- (void)linkManager:(ROKOLinkManager *)manager didFailToOpenDeepLinkWithError:(NSError *)error {
    // Handle error
}

@end
