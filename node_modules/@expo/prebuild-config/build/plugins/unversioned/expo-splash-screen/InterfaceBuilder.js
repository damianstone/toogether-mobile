"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyImageToSplashScreenXML = applyImageToSplashScreenXML;
exports.createTemplateSplashScreenAsync = createTemplateSplashScreenAsync;
exports.toString = toString;

function _crypto() {
  const data = _interopRequireDefault(require("crypto"));

  _crypto = function () {
    return data;
  };

  return data;
}

function _xml2js() {
  const data = require("xml2js");

  _xml2js = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createConstraint([firstItem, firstAttribute], [secondItem, secondAttribute]) {
  return {
    $: {
      firstItem,
      firstAttribute,
      secondItem,
      secondAttribute,
      // Prevent updating between runs
      id: createConstraintId(firstItem, firstAttribute, secondItem, secondAttribute)
    }
  };
}

function createConstraintId(...attributes) {
  return _crypto().default.createHash('sha1').update(attributes.join('-')).digest('hex');
}

function applyImageToSplashScreenXML(xml, {
  imageName,
  contentMode
}) {
  const imageId = 'EXPO-SplashScreen';
  const containerId = 'EXPO-ContainerView';
  const width = 414;
  const height = 736;
  const imageView = {
    $: {
      id: imageId,
      userLabel: imageName,
      image: imageName,
      contentMode,
      horizontalHuggingPriority: 251,
      verticalHuggingPriority: 251,
      clipsSubviews: true,
      userInteractionEnabled: false,
      translatesAutoresizingMaskIntoConstraints: false
    },
    rect: [{
      $: {
        key: 'frame',
        x: 0.0,
        y: 0.0,
        width,
        height
      }
    }]
  }; // Add ImageView

  xml.document.scenes[0].scene[0].objects[0].viewController[0].view[0].subviews[0].imageView.push(imageView); // Add Constraints

  xml.document.scenes[0].scene[0].objects[0].viewController[0].view[0].constraints[0].constraint.push( // <constraint firstItem="EXPO-SplashScreen" firstAttribute="top" secondItem="EXPO-ContainerView" secondAttribute="top" id="2VS-Uz-0LU"/>
  createConstraint([imageId, 'top'], [containerId, 'top']), createConstraint([imageId, 'leading'], [containerId, 'leading']), createConstraint([imageId, 'trailing'], [containerId, 'trailing']), createConstraint([imageId, 'bottom'], [containerId, 'bottom'])); // Add resource

  xml.document.resources[0].image.push({
    // <image name="SplashScreen" width="414" height="736"/>
    $: {
      name: imageName,
      width,
      height
    }
  });
  return xml;
}

async function createTemplateSplashScreenAsync() {
  const contents = `<?xml version="1.0" encoding="UTF-8"?>
    <document
      type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB"
      version="3.0"
      toolsVersion="16096"
      targetRuntime="iOS.CocoaTouch"
      propertyAccessControl="none"
      useAutolayout="YES"
      launchScreen="YES"
      useTraitCollections="YES"
      useSafeAreas="YES"
      colorMatched="YES"
      initialViewController="EXPO-VIEWCONTROLLER-1"
    >
      <device id="retina5_5" orientation="portrait" appearance="light"/>
      <dependencies>
        <deployment identifier="iOS"/>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="16087"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
      </dependencies>
      <scenes>
        <!--View Controller-->
        <scene sceneID="EXPO-SCENE-1">
          <objects>
            <viewController
              storyboardIdentifier="SplashScreenViewController"
              id="EXPO-VIEWCONTROLLER-1"
              sceneMemberID="viewController"
            >
              <view
                key="view"
                userInteractionEnabled="NO"
                contentMode="scaleToFill"
                insetsLayoutMarginsFromSafeArea="NO"
                id="EXPO-ContainerView"
                userLabel="ContainerView"
              >
                <rect key="frame" x="0.0" y="0.0" width="414" height="736"/>
                <autoresizingMask key="autoresizingMask" flexibleMaxX="YES" flexibleMaxY="YES"/>
                <subviews>
                  <imageView
                    userInteractionEnabled="NO"
                    contentMode="scaleAspectFill"
                    horizontalHuggingPriority="251"
                    verticalHuggingPriority="251"
                    insetsLayoutMarginsFromSafeArea="NO"
                    image="SplashScreenBackground"
                    translatesAutoresizingMaskIntoConstraints="NO"
                    id="EXPO-SplashScreenBackground"
                    userLabel="SplashScreenBackground"
                  >
                    <rect key="frame" x="0.0" y="0.0" width="414" height="736"/>
                  </imageView>
                </subviews>
                <color key="backgroundColor" systemColor="systemBackgroundColor"/>
                <constraints>
                  <constraint firstItem="EXPO-SplashScreenBackground" firstAttribute="top" secondItem="EXPO-ContainerView" secondAttribute="top" id="1gX-mQ-vu6"/>
                  <constraint firstItem="EXPO-SplashScreenBackground" firstAttribute="leading" secondItem="EXPO-ContainerView" secondAttribute="leading" id="6tX-OG-Sck"/>
                  <constraint firstItem="EXPO-SplashScreenBackground" firstAttribute="trailing" secondItem="EXPO-ContainerView" secondAttribute="trailing" id="ABX-8g-7v4"/>
                  <constraint firstItem="EXPO-SplashScreenBackground" firstAttribute="bottom" secondItem="EXPO-ContainerView" secondAttribute="bottom" id="jkI-2V-eW5"/>
                </constraints>
                <viewLayoutGuide key="safeArea" id="Rmq-lb-GrQ"/>
              </view>
            </viewController>
            <placeholder placeholderIdentifier="IBFirstResponder" id="EXPO-PLACEHOLDER-1" userLabel="First Responder" sceneMemberID="firstResponder"/>
          </objects>
          <point key="canvasLocation" x="140.625" y="129.4921875"/>
        </scene>
      </scenes>
      <resources>
        <image name="SplashScreenBackground" width="1" height="1"/>
      </resources>
    </document>`;
  return await new (_xml2js().Parser)().parseStringPromise(contents);
} // Attempt to copy Xcode formatting.


function toString(xml) {
  const builder = new (_xml2js().Builder)({
    preserveChildrenOrder: true,
    xmldec: {
      version: '1.0',
      encoding: 'UTF-8'
    },
    renderOpts: {
      pretty: true,
      indent: '    '
    }
  });
  return builder.buildObject(xml);
}
//# sourceMappingURL=InterfaceBuilder.js.map