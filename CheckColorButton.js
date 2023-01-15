//=============================================================================
// RPG Maker MZ - CheckColorButton
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 押された4色ボタンを記録・チェックします。
 * @author Hirorin495
 *
 * @help CheckColorButton.js
 * 
 * 押された4色ボタンを記録・チェックします。
 * 使用例
 *      ・押されたボタンの色を記録する。
 *      ・正解の順番なら封印を解く
 * 
 * プラグインコマンド
 *  pushRed     赤色のボタンが押されたことを記録する
 *  pushBlue    青色のボタンが押されたことを記録する
 *  pushYellow  黃色のボタンが押されたことを記録する
 *  pushGreen   緑色のボタンが押されたことを記録する
 * 
 * 
 * @param switchId
 * @text 正誤判定用スイッチID
 * @desc 正解時にtrueに切り替わります
 * @type number
 * 
 * @command pushRed
 *  @text 赤色のボタンが押下
 *  @desc 赤色のボタンが押されたことを記録する
 * 
 * @command pushBlue
 *  @text 青色のボタンが押下
 *  @desc 青色のボタンが押されたことを記録する
 * 
 * @command pushYellow
 *  @text 黃色のボタンが押下
 *  @desc 黃色のボタンが押されたことを記録する
 * 
 * @command pushGreen
 *  @text 緑色のボタンが押下
 *  @desc 緑色のボタンが押されたことを記録する
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    const pluginParams = PluginManager.parameters(pluginName);

    // カラーナンバリング
    const RED       = 1;
    const BLUE      = 2;
    const YELLOW    = 3;
    const GREEN     = 4;

    // 正誤判定スイッチID
    const SWITCH_ID = Number(pluginParams.switchId);

    // 押されたボタンを記録する数
    const BUTTON_LENGTH = 4;

    // 押されたボタンを記録するリスト
    let pushButtonList = [];

    // 押されたボタンを記録する
    const pushButtonUpdate = (colorNum) => {
        pushButtonList.push(colorNum);
        if (pushButtonList.length > BUTTON_LENGTH) {
            pushButtonList.shift();
        }
    }

    // 押されたボタンをチェックし、正誤判定をする
    const checkPushButton　= () => {
        if (pushButtonList.toString() === [BLUE, GREEN, YELLOW, RED].toString() ) {
            AudioManager.playSe({"name":"Key","volume":90,"pitch":100,"pan":0});
            $gameSwitches.setValue(SWITCH_ID, true);
        } else {
            $gameSwitches.setValue(SWITCH_ID, false);
        }
    }

    // 赤色ボタン押下
    PluginManager.registerCommand(pluginName, "pushRed", () => {
        pushButtonUpdate(RED);
        checkPushButton();
    });

    // 青色ボタン押下
    PluginManager.registerCommand(pluginName, "pushBlue", () => {
        pushButtonUpdate(BLUE);
        checkPushButton();
    });

    // 黃色ボタン押下
    PluginManager.registerCommand(pluginName, "pushYellow", () => {
        pushButtonUpdate(YELLOW);
        checkPushButton();
    });

    // 緑色ボタン押下
    PluginManager.registerCommand(pluginName, "pushGreen", () => {
        pushButtonUpdate(GREEN);
        checkPushButton();
    });
})();