
## iOS
```
#import "CodePush.h"

//替换
//jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
jsCodeLocation = [CodePush bundleURL];

```

## 配置 plist
- `CodePushDeploymentKey` : `code-push deployment ls <appName> -k`



# JS 代码
## 集成形式
- 使用 `CodePush` 包装根组件
```
import codePush from "react-native-code-push";
class MyApp extends Component {
}

MyApp = codePush(MyApp);
```

- ES7 装饰语法
```
import codePush from "react-native-code-push";

@codePush
class MyApp extends Component {
}
```

- 自定义
```
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

class MyApp extends Component {
    onButtonPress() {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE
        });
    }

    render() {
        <View>
            <TouchableOpacity onPress={this.onButtonPress}>
                <Text>Check for updates</Text>
            </TouchableOpacity>
        </View>
    }
}

MyApp = codePush(codePushOptions)(MyApp);
```
